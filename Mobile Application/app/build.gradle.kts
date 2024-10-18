plugins {
    alias(libs.plugins.android.application)
}

android {
    namespace = "com.example.new_ead"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.new_ead"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
}

dependencies {
    implementation(libs.appcompat)
    implementation(libs.material)
    implementation(libs.activity)
    implementation(libs.constraintlayout)

    // Adding Volley for network requests
    implementation("com.android.volley:volley:1.2.1")

    // Adding Gson for handling JSON
    implementation("com.google.code.gson:gson:2.8.9") // Ensure this matches your existing version

    // Adding OkHttp for making HTTP requests
    implementation("com.squareup.okhttp3:okhttp:4.9.3") // Ensure this matches your existing version

    // Adding CardView for product display in cards
    implementation("androidx.cardview:cardview:1.0.0")

    // Adding Glide for image loading
    implementation("com.github.bumptech.glide:glide:4.14.2")
    annotationProcessor("com.github.bumptech.glide:compiler:4.14.2")
    implementation ("com.google.android.material:material:1.6.0")

    // Unit testing dependencies
    testImplementation(libs.junit)
    androidTestImplementation(libs.ext.junit)
    androidTestImplementation(libs.espresso.core)
}