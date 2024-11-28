# Deployment Keempat
Menambahkan keamanan dengan JWT

Mengupload gambar prediksi untuk retraining di waktu yaang akan datang

untuk melakukan deployment dengan menyertakan secret key sebagai environtment variable gunakan option command sebagai berikut 
```
gcloud run deploy [SERVICE_NAME] \
  --image [IMAGE_URL] \
  --set-env-vars VAR1=value1,VAR2=value2,VAR3=value3 \
  --region [REGION]
```

```
    --set-env-vars JWT_SECRET=your_secret_key
```

