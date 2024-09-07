asosiy ip address, barcha requestlar shu ip addressga jo'natiladi: 
http://13.51.195.13:5000


<!-- Routes -->
/refreshToken - tokenni refresh qilish uchun body ga userni refreshTokeni jo'natiladi

/api
  1. /users
    <!-- user uchun: -->
    # /profile - userni profileni olish
        Method: GET
    # /signup - ro'yhatdan o'tish
        Method: POST
        Value: body ga jo'natiladi
    # /signin - avval ro'yhatdan o'tgan profilega kirish
        Method: POST
        Value: body ga jo'natiladi
    # /update/:id - user profileni o'zgartirish
        Method: UPDATE
        Value: body ga jo'natiladi
    # /logout - profiledan chiqish
        Method: POST
    # /delete/:id - user profileni o'chirishi
        Method: DELETE
        Value: paramsga id jo'natiladi

    <!-- admin uchun: -->
    # / - barcha userni olish uchun

    # /:id - bitta userni id orqali olish uchun
        value: params ga user id jo'natiladi
    # /addAdmin - hozirgi role admin bo'lsa admin qo'shish mumkin
        value: body ga ro'yhatdan o'tgan user ni emaili jo'natiladi

  2. /products
    <!-- user uchun -->
      # / - barcha productlarni olish
          Method: GET
      # /:id - productni id orqali olish
          Method: GET
          Value: params ga product id jo'natiladi

    <!-- admin uchun -->
      # /create - product yaratish
          Method: POST
          Value: bodyga jo'natiladi
      # /update/:id - yaratilgan productni yangilash
          Method: UPDATE
          Value: paramsga id, bodyga yangilangan product jo'natiladi
      # /delete/:id - yaratilgan productni o'chirish
          Method: DELETE
          Value: paramsga product id jo'natiladi

  3. /brands
      <!-- user uchun -->
      # / - barcha brandlarni olish
          Method: GET
      # /:id - brandni id orqali olish
          Method: GET
          Value: params ga brand id jo'natiladi

      <!-- admin uchun -->
      # /create - brand yaratish
          Method: POST
          Value: bodyga jo'natiladi
      # /update/:id - yaratilgan brandni yangilash
          Method: UPDATE
          Value: paramsga id, bodyga yangilangan brand jo'natiladi
      # /delete/:id - yaratilgan brandni o'chirish
          Method: DELETE
          Value: paramsga brand id jo'natiladi

  4. /categories
      <!-- user uchun -->
      # / - barcha categoryalarni olish
          Method: GET
      # /:id - categorini id orqali olish
          Method: GET
          Value: params ga category id jo'natiladi

      <!-- admin uchun -->
      # /create - category yaratish
          Method: POST
          Value: bodyga jo'natiladi
      # /update/:id - categoryni id orqali yangilash
          Method: POST
          Value: bodyga jo'natiladi
      # /delete/:id - yaratilgan categorini o'chirish
          Method: DELETE
          Value: paramsga category id jo'natiladi

  5. /baskets
        <!-- user uchun -->
      # / - barcha basketni olish
          Method: GET
      # /:id - basketni id orqali olish
          Method: GET
          Value: params ga basket id jo'natiladi

      <!-- admin uchun -->
      # /create - basket yaratish
          Method: POST
          Value: bodyga jo'natiladi
      # /update/:id - basket ni id orqali yangilash
          Method: POST
          Value: bodyga jo'natiladi
      # /update/:id - yaratilgan basketni yangilash
          Method: UPDATE
          Value: paramsga id, bodyga yangilangan basket jo'natiladi
        # /delete/basket-items/:id - yaratilgan basket itemni o'chirish
          Method: DELETE
          Value: paramsga basket id jo'natiladi
      # /delete/:id - yaratilgan basketni o'chirish
          Method: DELETE
          Value: paramsga basket id jo'natiladi

  6. /orders

<!-- example request: -->
http://16.171.43.147:5000/api/profile


<!-- Models -->
  1. Users
    1. first_name
      type: STRING
    2. last_name
      type: STRING
    3. email
      type: STRING
    4. password
      type: STRING

  2. Prodcuts
    1. name
      type: STRING
    2. price
      type: BIGINT
    3. available_count
      type: INTEGER
    4. colors
      type: ARRAY[STRING]
    5. sizes
      type: ARRAY[STRING]
    6. brand_id
      type: UUID
    7. category_id
      type: UUID

  3. Brands
    1. name
      type: STRING

  4. Categories
    1. name
      type: STRING

  5. Baskets
    1. user_id
      type: UUID
    1. product_id
      type: UUID
    1. count
      type: INT
    1. price
      type: INT

  6. Orders
    1. total_sum
      type: INTEGER
    1. user_id
      type: UUID
    1. status
      type: ENUM("0", "1", "2", "3")


Order status code:
  0 - buyurtma yaratildi
  1 - buyurtma uchun to'lov qilindi
  2 - buyurtma yetqazib berildi
  3 - buyurtma bekor qilindi
