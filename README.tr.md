# Not API Projesi

**Language / Dil:** 🇹🇷 Türkçe | [🇺🇸 English](README.md)

Bu proje, TypeScript öğrenmek amacıyla oluşturulmuş bir RESTful API'dir. JWT yetkilendirmesi implementasyonu ve MongoDB ile Mongoose kullanarak CRUD işlemlerini göstermekte olup, backend geliştirme konseptleri hakkında sağlam bir anlayış kazandırmayı amaçlamaktadır.

## Özellikler

- JWT (JSON Web Tokens) ile kullanıcı kimlik doğrulama
- Notlar için eksiksiz CRUD işlemleri
- Mongoose ile MongoDB entegrasyonu
- TypeScript implementasyonu
- Girdi doğrulama
- Hata yönetimi

## Kurulum Talimatları

### Ön Koşullar

- Node.js (v14 veya daha yüksek)
- MongoDB (yerel kurulum veya MongoDB Atlas hesabı)
- npm veya yarn

### Kurulum

1. Depoyu klonlayın
```bash
git clone https://github.com/emre-tiryaki/Notes_api-project.git
cd Notes_api-project
```

2. Bağımlılıkları yükleyin
```bash
npm install
```

3. Ortam Yapılandırması
   - Kök dizinde `.env.example` dosyasını baz alarak bir `.env` dosyası oluşturun
   - Gerekli ortam değişkenlerini doldurun:

```
PORT=3000                            # API'nizin çalışacağı port
MONGODB_URI=mongodb://localhost:27017/notes_db  # MongoDB bağlantı diziniz
JWT_SECRET=your_jwt_secret_key       # JWT token oluşturmak için gizli anahtar
JWT_EXPIRATION=1d                    # JWT token süresi (örn. 1d = 1 gün)
```

4. Geliştirme sunucusunu başlatın
```bash
npm run devStart
```

## API Uç Noktaları

### Kimlik Doğrulama

#### POST /auth/register
- **Açıklama**: Yeni bir kullanıcı kaydı oluşturur
- **İstek Gövdesi**:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
- **Yanıtlar**:
  - `201 Created`:
  ```json
  {
    "message": "User registered successfully",
  }
  ```
  - `400 Bad Request`:
  ```json
  {
    "error": "Validation error message"
  }
  ```
  - `409 Conflict`:
  ```json
  {
    "error": "User already exists"
  }
  ```

#### POST /auth/login
- **Açıklama**: Kullanıcıyı doğrular ve bir JWT token döndürür
- **İstek Gövdesi**:
```json
{
  "email": "string",
  "password": "string"
}
```
- **Yanıtlar**:
  - `200 OK`:
  ```json
  {
    "token": "jwt_token_string",
    "user": {
      "id": "string",
      "username": "string",
      "email": "string"
    }
  }
  ```
  - `401 Unauthorized`:
  ```json
  {
    "error": "Invalid credentials"
  }
  ```

### Notlar

#### GET /notes/all
- **Açıklama**: Kimliği doğrulanmış kullanıcı için tüm notları getirir
- **Başlıklar**: 
  - `Authorization: Bearer {token}`
- **Yanıtlar**:
  - `200 OK`:
  ```json
  {
    "notes": [
      {
        "id": "string",
        "title": "string",
        "content": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ]
  }
  ```
  - `401 Unauthorized`:
  ```json
  {
    "error": "Unauthorized"
  }
  ```

#### GET /notes/:id
- **Açıklama**: ID'ye göre belirli bir notu getirir
- **Başlıklar**: 
  - `Authorization: Bearer {token}`
- **URL Parametreleri**:
  - `id`: Not ID'si
- **Yanıtlar**:
  - `200 OK`:
  ```json
  {
    "id": "string",
    "title": "string",
    "content": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
  ```
  - `404 Not Found`:
  ```json
  {
    "error": "Note not found"
  }
  ```
  - `401 Unauthorized`:
  ```json
  {
    "error": "Unauthorized"
  }
  ```

#### POST /notes
- **Açıklama**: Yeni bir not oluşturur
- **Başlıklar**: 
  - `Authorization: Bearer {token}`
- **İstek Gövdesi**:
```json
{
  "title": "string",
  "content": "string"
}
```
- **Yanıtlar**:
  - `201 Created`:
  ```json
  {
    "id": "string",
    "title": "string",
    "content": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
  ```
  - `400 Bad Request`:
  ```json
  {
    "error": "Validation error message"
  }
  ```
  - `401 Unauthorized`:
  ```json
  {
    "error": "Unauthorized"
  }
  ```

#### PUT /notes/:id
- **Açıklama**: Mevcut bir notu günceller
- **Başlıklar**: 
  - `Authorization: Bearer {token}`
- **URL Parametreleri**:
  - `id`: Not ID'si
- **İstek Gövdesi**:
```json
{
  "title": "string",
  "content": "string"
}
```
- **Yanıtlar**:
  - `200 OK`:
  ```json
  {
    "id": "string",
    "title": "string",
    "content": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
  ```
  - `404 Not Found`:
  ```json
  {
    "error": "Note not found"
  }
  ```
  - `401 Unauthorized`:
  ```json
  {
    "error": "Unauthorized"
  }
  ```

#### DELETE /notes/:id
- **Açıklama**: Bir notu siler
- **Başlıklar**: 
  - `Authorization: Bearer {token}`
- **URL Parametreleri**:
  - `id`: Not ID'si
- **Yanıtlar**:
  - `200 OK`:
  ```json
  {
    "message": "Note deleted successfully"
  }
  ```
  - `404 Not Found`:
  ```json
  {
    "error": "Note not found"
  }
  ```
  - `401 Unauthorized`:
  ```json
  {
    "error": "Unauthorized"
  }
  ```

## Hata Yönetimi

API, uygun HTTP durum kodlarını ve aşağıdaki formatta hata mesajlarını döndürür:

```json
{
  "error": "Hata mesajı"
}
```

## Kimlik Doğrulama

`/auth/register` ve `/auth/login` dışındaki tüm rotalar kimlik doğrulama gerektirir.
JWT token'ı Authorization başlığında aşağıdaki şekilde ekleyin:

```
Authorization: Bearer <token_buraya>
```

## Teşekkürler

Bu Not API projesine gösterdiğiniz ilgi için teşekkür ederiz! Bu proje, TypeScript, JWT yetkilendirme ve Mongoose ile CRUD işlemleri hakkında daha iyi bir anlayış kazanmak için bir öğrenme egzersizi olarak geliştirilmiştir. Kendi öğrenme amaçlarınız için projeyi forklayıp değiştirebilirsiniz.

Herhangi bir sorunuz veya öneriniz varsa, lütfen bir issue açmaktan veya pull request göndermekten çekinmeyin.
