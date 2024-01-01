# Dashboard App (Still in progress)

Goal is to create a dashboard which will show  

## Views

![laptop size light blue theme]('./README_imgs/xl-light-blue.png')
![desktop size dark theme]('./README_imgs/2xl-dark.png')
![tablet size light blue theme]('./README_imgs/md-grey.png')
![phone size light blue theme]('./README_imgs/sm-light-blue.png')
![phone size grey theme]('./README_imgs/sm-grey.png')


## To setup backend
1. Create the .env file in root folder and the envrionment variables
    ```
    POSTGRES_CONNECT_URL="postgresql://siddhant:password@localhost:5432/world-data"
    ENVIRONMENT_TYPE="PROD"
    ALLOWED_ORIGIN_CLIENT_1="http://localhost:5173"
    ALLOWED_ORIGIN_CLIENT_2="http://localhost:5173"
    ALLOWED_ORIGIN_CLIENT_3="http://localhost:5173"
    ALLOWED_ORIGIN_CLIENT_4="http://localhost:5173"
    ```
2. go to backend folder
    ```
    cd backend
    ```
3. create virtual env **(optional)**  
     * Insted of "./env" can write any path where the files will be stored
      ``` 
      python3 -m venv ./env 
      ```
4. connect with the virtual environement **(Only if the virtual env is created)**
    ```
    source env/bin/activate
    ```
5. install the requirement.txt packages
    ```
    pip install -r requirements.txt
    ```
6. Run the server
    ```
    python main.py
    ``` 

