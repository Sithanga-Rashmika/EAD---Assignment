package com.example.new_ead;

import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import com.bumptech.glide.Glide;

public class ProductDetailsActivity extends AppCompatActivity {
    private ImageView productImageView;
    private TextView productNameTextView;
    private TextView productDescriptionTextView;
    private TextView productPriceTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_detail);

        productImageView = findViewById(R.id.productImageView);
        productNameTextView = findViewById(R.id.productNameTextView);
        productDescriptionTextView = findViewById(R.id.productDescriptionTextView);
        productPriceTextView = findViewById(R.id.productPriceTextView);

        // Get the product from the intent
        Product product = getIntent().getParcelableExtra("product");

        if (product != null) {
            displayProduct(product);
        }
    }

    private void displayProduct(Product product) {
        productNameTextView.setText(product.getName());
        productDescriptionTextView.setText(product.getDescription());
        productPriceTextView.setText(String.format("Price: %.2f", product.getPrice()));

        // Load the image using Glide
        String imageUrl = "http://10.0.2.2:5154" + product.getImageUrl();
        Glide.with(this).load(imageUrl).into(productImageView);
    }
}
