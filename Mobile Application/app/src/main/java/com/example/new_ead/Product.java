package com.example.new_ead;

import android.os.Parcel;
import android.os.Parcelable;

public class Product implements Parcelable {
    private String productID;      // Assuming you have a product ID
    private String vendorID;       // Assuming you have a vendor ID
    private String name;
    private String description;
    private double price;
    private int stockQuantity;     // Stock quantity
    private String imageUrl;
    private String category;        // Added category

    // Constructor
    public Product(String productID, String vendorID, String name, String description, double price, int stockQuantity, String imageUrl, String category) {
        this.productID = productID;
        this.vendorID = vendorID;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stockQuantity = stockQuantity; // Initialize stock quantity
        this.imageUrl = imageUrl;
        this.category = category;           // Initialize category
    }

    // Getters
    public String getProductID() {
        return productID;
    }

    public String getVendorID() {
        return vendorID;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public double getPrice() {
        return price;
    }

    public int getStockQuantity() { // Getter for stock quantity
        return stockQuantity;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getCategory() { // Added getter for category
        return category;
    }

    // Parcelable implementation
    protected Product(Parcel in) {
        productID = in.readString();
        vendorID = in.readString();
        name = in.readString();
        description = in.readString();
        price = in.readDouble();
        stockQuantity = in.readInt(); // Read stock quantity from Parcel
        imageUrl = in.readString();
        category = in.readString();    // Read category from Parcel
    }

    public static final Creator<Product> CREATOR = new Creator<Product>() {
        @Override
        public Product createFromParcel(Parcel in) {
            return new Product(in);
        }

        @Override
        public Product[] newArray(int size) {
            return new Product[size];
        }
    };

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(productID);
        dest.writeString(vendorID);
        dest.writeString(name);
        dest.writeString(description);
        dest.writeDouble(price);
        dest.writeInt(stockQuantity); // Write stock quantity to Parcel
        dest.writeString(imageUrl);
        dest.writeString(category);     // Write category to Parcel
    }
}
