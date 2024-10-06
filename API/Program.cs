var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.Configure<MongoDbSettings>(options =>
{
    options.ConnectionString = builder.Configuration.GetSection("ConnectionStrings:MongoDb").Value;
    options.DatabaseName = builder.Configuration.GetSection("DatabaseSettings:DatabaseName").Value;
});
builder.Services.AddRazorPages();               // Razor Pages, if you are also serving HTML views
builder.Services.AddControllers();              // API Controllers
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<ProductRepository>();
builder.Services.AddScoped<ARoleRepository>();
builder.Services.AddScoped<CategoryRepository>();
// builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("ConnectionStrings"));  // Register UserRepository as scoped
builder.Services.AddSingleton<MongoDbContext>(); // Make sure MongoDbContext is registered


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

app.UseAuthorization();

// Map Razor Pages (for serving HTML if necessary)
app.MapRazorPages();

// Map API Controllers (for Web API)
app.MapControllers();

app.Run();
