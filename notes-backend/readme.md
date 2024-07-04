# Documentation Backend

## Description
Aplikasi ini dibuat dengan menggunakan express js, dimana terdapat dua fitur pada aplikasi ini yaitu membuat todos dan notes. Berikut merupakan penjelasan lengkap dalam consume API yang benar.

### Todos Route
1. Get All Todos
```
Method: GET
Router: http://localhost:5000/todos
```

2. Get Todos By ID
```
Method: GET
Router: http://localhost:5000/todos/:id
```

3. Create Todos
```
Method: POST
Router: http://localhost:5000/todos/

Body: {
    "title": "input your title here",
    "isDone": false
}
```

4. Update Todos
```
Method: PUT
Router: http://localhost:5000/todos/:id

Body: {
    "title": "input your title here",
    "isDone": true
}
```

5. Delete Todos
```
Method: Delete
Router: http://localhost:5000/todos/:id
```


### Notes Route
1. Get All Notes
```
Method: GET
Router: http://localhost:5000/notes
```

2. Get Notes By ID
```
Method: GET
Router: http://localhost:5000/notes/:id
```

3. Create Notes
```
Method: POST
Router: http://localhost:5000/notes/

Body: {
    "title": "input your title here",
    "author": "Jhon Doe",
    "status": false,
    "important": true,
    "date": "03-07-2024",
    "desc": "input your description here"
}
```

4. Update Notes
```
Method: PUT
Router: http://localhost:5000/notes/:id

Body: {
    "title": "input your title here",
    "author": "Jhon Doe",
    "status": false,
    "important": true,
    "date": "03-07-2024",
    "desc": "input your description here"
}
```

5. Delete Notes
```
Method: Delete
Router: http://localhost:5000/notes/:id
```

### Users Route
1. Register
```
Method: POST
Route: http://localhost:5000/users/register

body: {
    "name": "Jhon Doe",
    "email": "jhon@gmail.com",
    "password": "jhondoe",
    "confPassword": "jhondoe",
    "birthdate": "02-02-1980"
}
```

2. Login 
```
Method: POST
Route: http://localhost:5000/users/login

body {
    "email": "jhon@gmail.com",
    "password": "jhondoe"
}
```

3. Logout
```
Method: DELETE
Route: http://localhost:5000/users/logout
```

4. Me
```
Method: GET
Route: http://localhost:5000/users/me
```

5. Update Profile
```
Method: PUT
Route: http://localhost:5000/users/edit/:id

body {
    "address": "new york",
    "phone_number": "+1232927380",
    "desc": "i'm very handsome"
}
```

6. Change Password
```
Method: PUT
Route: http://localhost:5000/users/change-password/:id

body {
    "currentPassword": "jhondoe",
    "newPassword": "jhonDoooo",
    "confPassword": "jhonDoooo"
}
```