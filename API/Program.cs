using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.Configure<MongoDbSettings>(options =>
{
    options.ConnectionString = builder.Configuration.GetSection("ConnectionStrings:MongoDb").Value;
    options.DatabaseName = builder.Configuration.GetSection("DatabaseSettings:DatabaseName").Value;
});

// Add authentication services (JWT configuration)
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("duyudsfyudsyoyf3122312y3fyfcfycku31cuutgk3"))
    };
});

builder.Services.AddRazorPages();               // Razor Pages, if you are also serving HTML views
builder.Services.AddControllers();              // API Controllers
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<ProductRepository>();
builder.Services.AddScoped<ARoleRepository>();
builder.Services.AddScoped<CategoryRepository>();
builder.Services.AddScoped<VendorRatingRepository>();
builder.Services.AddScoped<MyOrderRepository>();
builder.Services.AddScoped<CartRepository>();
builder.Services.AddSingleton<MongoDbContext>(); // Make sure MongoDbContext is registered

// Configure CORS to allow requests from any origin (can be restricted later)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// Add Authentication and Authorization middleware
app.UseAuthentication();
app.UseAuthorization();

// Map Razor Pages (for serving HTML if necessary)
app.MapRazorPages();

// Map API Controllers (for Web API)
app.MapControllers();

// Enable CORS in the middleware pipeline
app.UseCors("AllowAll");

app.Run();
