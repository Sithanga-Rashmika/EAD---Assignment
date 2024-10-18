package com.example.new_ead;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.gson.Gson;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class RegisterActivity extends AppCompatActivity {

    private EditText emailEditText;
    private EditText passwordEditText;
    private EditText contactEditText;
    private EditText nameEditText;
    private EditText addressEditText;
    private EditText genderEditText;
    private Button registerButton;

    private static final String TAG = "RegisterActivity";
    private static final String REGISTER_URL = "http://10.0.2.2:5154/api/User/Register"; // Use this for emulator

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        emailEditText = findViewById(R.id.emailEditText);
        passwordEditText = findViewById(R.id.passwordEditText);
        contactEditText = findViewById(R.id.contactEditText);
        nameEditText = findViewById(R.id.nameEditText);
        addressEditText = findViewById(R.id.addressEditText);
        genderEditText = findViewById(R.id.genderEditText);
        registerButton = findViewById(R.id.registerButton);

        registerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                register();
            }
        });
    }

    private void register() {
        String email = emailEditText.getText().toString().trim();
        String password = passwordEditText.getText().toString().trim();
        String contact = contactEditText.getText().toString().trim();
        String name = nameEditText.getText().toString().trim();
        String address = addressEditText.getText().toString().trim();
        String gender = genderEditText.getText().toString().trim();

        if (email.isEmpty() || password.isEmpty() || contact.isEmpty() || name.isEmpty() || address.isEmpty() || gender.isEmpty()) {
            Toast.makeText(this, "All fields must not be empty", Toast.LENGTH_SHORT).show();
            return;
        }

        // Create JSON payload
        Map<String, String> userData = new HashMap<>();
        userData.put("email", email);
        userData.put("password", password);
        userData.put("contact", contact);
        userData.put("name", name);
        userData.put("address", address);
        userData.put("gender", gender);
        userData.put("isActive", ""); // You can set this to "" or remove it from here

        String json = new Gson().toJson(userData);

        // Create OkHttpClient
        OkHttpClient client = new OkHttpClient();

        // Create request body
        RequestBody body = RequestBody.create(json, MediaType.parse("application/json; charset=utf-8"));

        // Build request
        Request request = new Request.Builder()
                .url(REGISTER_URL)
                .post(body)
                .build();

        // Execute request
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                Log.e(TAG, "Registration request failed: " + e.getMessage());
                runOnUiThread(() -> Toast.makeText(RegisterActivity.this, "Registration request failed: " + e.getMessage(), Toast.LENGTH_LONG).show());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String responseBody = response.body() != null ? response.body().string() : "";
                if (response.isSuccessful()) {
                    Log.d(TAG, "Registration successful: " + responseBody);
                    runOnUiThread(() -> {
                        Toast.makeText(RegisterActivity.this, "Registration successful! Awaiting CSR activation.", Toast.LENGTH_SHORT).show();
                        // Redirect to login page
                        Intent intent = new Intent(RegisterActivity.this, LoginActivity.class);
                        startActivity(intent);
                        finish();
                    });
                } else if (response.code() == 400) {  // Handle "User already exists" error
                    Log.e(TAG, "User already exists: " + responseBody);
                    runOnUiThread(() -> Toast.makeText(RegisterActivity.this, "User already exists.", Toast.LENGTH_LONG).show());
                } else {
                    Log.e(TAG, "Registration failed: " + responseBody);
                    runOnUiThread(() -> Toast.makeText(RegisterActivity.this, "Registration failed.", Toast.LENGTH_LONG).show());
                }
            }
        });
    }
}
