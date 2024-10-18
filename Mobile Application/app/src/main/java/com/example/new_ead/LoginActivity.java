package com.example.new_ead;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.new_ead.ProductActivity;


import androidx.appcompat.app.AppCompatActivity;

import com.google.gson.Gson;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class LoginActivity extends AppCompatActivity {

    private EditText emailEditText;
    private EditText passwordEditText;
    private Button loginButton;
    private TextView registerTextView;

    private static final String TAG = "LoginActivity";
    private static final String LOGIN_URL = "http://10.0.2.2:5154/api/User/Login"; // URL for API

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        emailEditText = findViewById(R.id.emailEditText);
        passwordEditText = findViewById(R.id.passwordEditText);
        loginButton = findViewById(R.id.loginButton);
        registerTextView = findViewById(R.id.registerTextView);

        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                login();
            }
        });

        // Redirect to RegisterActivity when "Don't Have An Account?" is clicked
        registerTextView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(LoginActivity.this, RegisterActivity.class);
                startActivity(intent);
            }
        });
    }

    private void login() {
        String email = emailEditText.getText().toString().trim();
        String password = passwordEditText.getText().toString().trim();

        if (email.isEmpty() || password.isEmpty()) {
            Toast.makeText(this, "Email and password must not be empty", Toast.LENGTH_SHORT).show();
            return;
        }

        // Create JSON payload
        Map<String, String> loginData = new HashMap<>();
        loginData.put("email", email);
        loginData.put("password", password);
        String json = new Gson().toJson(loginData);

        // Create OkHttpClient
        OkHttpClient client = new OkHttpClient();

        // Create request body
        RequestBody body = RequestBody.create(json, MediaType.parse("application/json; charset=utf-8"));

        // Build request
        Request request = new Request.Builder()
                .url(LOGIN_URL)
                .post(body)
                .build();

        // Execute request
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                Log.e(TAG, "Login request failed: " + e.getMessage());
                runOnUiThread(() -> Toast.makeText(LoginActivity.this, "Login request failed: " + e.getMessage(), Toast.LENGTH_LONG).show());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                Log.d(TAG, "Response code: " + response.code());
                String responseBody = response.body() != null ? response.body().string() : "";

                // Handle different responses
                if (response.code() == 200) {
                    Log.d(TAG, "Login successful: " + responseBody);
                    runOnUiThread(() -> {
                        Toast.makeText(LoginActivity.this, "Login successful!", Toast.LENGTH_SHORT).show();
                        // Navigate to Product page or another activity
                        Intent intent = new Intent(LoginActivity.this, ProductActivity.class);
                        startActivity(intent);
                        finish(); // Close current activity
                    });
                } else if (response.code() == 404) {
                    Log.e(TAG, "User not found: " + responseBody);
                    runOnUiThread(() -> Toast.makeText(LoginActivity.this, "User not found.", Toast.LENGTH_LONG).show());
                } else if (response.code() == 400) {
                    Log.e(TAG, "Account inactive or other bad request: " + responseBody);
                    runOnUiThread(() -> Toast.makeText(LoginActivity.this, "Account inactive or bad request: " + responseBody, Toast.LENGTH_LONG).show());
                } else if (response.code() == 401) {
                    Log.e(TAG, "Invalid password: " + responseBody);
                    runOnUiThread(() -> Toast.makeText(LoginActivity.this, "Invalid password.", Toast.LENGTH_LONG).show());
                } else {
                    Log.e(TAG, "Unexpected error: " + responseBody);
                    runOnUiThread(() -> Toast.makeText(LoginActivity.this, "Unexpected error occurred.", Toast.LENGTH_LONG).show());
                }
            }
        });
    }
}
