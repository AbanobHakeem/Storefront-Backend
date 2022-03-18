# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products

- popular - NoToken 
    endpoint : '/products/popular'
    methohd:`GET`
    body 
    ```json
    N\A
     ```
    

- Index - NoToken
    endpoint : '/products'
    methohd:`GET`
    body 
    ```json
    N\A
     ```
    

- Show - NoToken
    endpoint : '/products/:id'
    methohd:`GET`
    body 
    ```json
    N\A
     ```
  
- Get By Category - NoToken
    endpoint : '/products/:category_id/category'
    methohd:`GET`
    body 
    ```json
    N\A
     ```

- Create New - [Token]
    endpoint : '/products'
    methohd:`POST`
    body 
    ```json
    {
    "name":"Galaxy Z-5000",
    "price":"60000",
    "category_id":"3"
    }
    
    ```
  
- Update - [Token]
    endpoint : '/products/:id'
    methohd:`PUT`
    body 
    ```json
    {
    "name":"Galaxy Z-5000",
    "price":"60000",
    "category_id":"3"
    }
   
    ``` 

- DELETE - [Token]
    endpoint : '/products/:id'
    methohd:`DELETE`
    body 
    ```json
    {
    "id":"12",
    }

    ``` 

#### Categorys

- Index - NoToken
    endpoint : '/categories'
    methohd:`GET`
    body 
    ```json
    N\A
     ```
    

- Show - NoToken
    endpoint : '/categories/:id'
    methohd:`GET`
    body 
    ```json
    N\A
     ```
  

- Create New - [Token]
    endpoint : '/categories'
    methohd:`POST`
    body 
    ```json
    {
    "name":"Smart Watch",
    }
    
    ```
  
- Update - [Token]
    endpoint : '/categories/:id'
    methohd:`PUT`
    body 
    ```json
    {
    "name":"TV",
   
    }
   
    ``` 

- DELETE - [Token]
    endpoint : '/categories/:id'
    methohd:`DELETE`
    body 
    ```json
    {
    "id":"12",
    }

    ``` 

#### Users

- Index - [Token]
    endpoint : '/users'
    methohd:`GET`
    body 
    ```json
    N\A
     ```
    

- Show - [Token]
    endpoint : '/users/:id'
    methohd:`GET`
    body 
    ```json
    N\A
     ```
  

- Create New - NoToken
    endpoint : '/users'
    methohd:`POST`
    body 
    ```json
    {
    "firstname":"Abanob",
    "lastname":"Magdy",
    "username":"Abanob",
    "password_digest" :"password_digest"
    }
    
    ```
  
- Update - [Token]
    endpoint : '/users/:id'
    methohd:`PUT`
    body 
    ```json
    {
    "firstname":"Abanob",
    "lastname":"Magdy",
    "username":"Abanob",
    "password_digest" :"password_digest"
    }
   
    ``` 

- DELETE - [Token]
    endpoint : '/users/:id'
    methohd:`DELETE`
    body 
    ```json
    {
    "id":"12",
    }

    ``` 

- AuthUser - [Token]
    endpoint : '/users/auth''
    methohd:`POST`
    body 
    ```json
    {
    "username":"Alba",
    "password" :"password_digest"
    }

    ``` 

#### Orders


- Index - [Token]
    endpoint : '/orderes'
    methohd:`GET`
    body 
    ```json
    N\A
     ```
    

- Show - [Token]
    endpoint : '/orderes/:id'
    methohd:`GET`
    body 
    ```json
    N\A
     ```
  

- Create New - [Token]
    endpoint : '/orderes'
    methohd:`POST`
    body 
    ```json
    N\A
    
    ```
  
- Update - [Token]
    endpoint : '/orderes/:id'
    methohd:`PUT`
    body 
    ```json
    {
    "status": "complete",
    "user_id": "4"
    }
   
    ``` 

- DELETE - [Token]
    endpoint : '/orderes/:id'
    methohd:`DELETE`
    body 
    ```json
    {
    "id":"12",
    }

    ``` 

- Add Product to the logged User- [Token]
    endpoint : '/orders/:id/products'
    methohd:`POST`
    body 
    ```json
     {
    "quantity":6,
    "productId":10
        }
    
    ```
  

- Get user current order - [Token]
    endpoint : '/orders/current/:user_id/user'
    methohd:`GET`
    body 
    ```json
    N\A
     ```


- Get user current order - [Token]
    endpoint : '/orders/:id/complete/:user_id/user'
    methohd:`PATCH`
    body 
    ```json
    N\A
     ```

## Data Shapes
#### Product
-  id
- name
- price
- category_id

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- user_id
- status 

#### Orders_Producsts
- id
- order_id
- product_id
- quantity 

