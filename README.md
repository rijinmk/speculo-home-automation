 ![Speculo File Structure](https://github.com/rijinmk/speculo-home-automation/blob/master/DesignFiles/GitHubFileStructure.jpg)

---

## 📁Folder: **NodeMCU**

---

### 📝File:`MainController.ino`
_Language: Embedded C_

This file will contain all the code that is required to run our home automation system. This code has to be well structured and final cause we can't debug it much after we have 

This file will handle the request:
```
HTTP 192.168.x.x/161
```
Where 161 is 16-1, 16th GPIO pin and its state which is 1.

---

## 📁Folder: **RaspberryPi**

---

This folder will contain all the code that will go into our Raspberry Pi Server.

### 📁Folder: **Mirror**

 > Will start work after the Home Automation Part is done

- 📁Folder:*WidgetsAPI*

This folder will contain all the code that is required to fetch all the data from the API and send it to the display folder and display it there. 

-  📁Folder:*Display*

This will contain one main index page which will be displayed on the mirror, it will be a NodeApp which will handle all the API request from the API Folder which intern will fetch all the JSON data that we require from 

### 📁Folder: **HomeAutomation**

This is **OUR MAIN FOLDER**, This is going to be a massive Node Application where it handles all the requests from our Firebase / MongoDB API. We need the following library:

1. ExpressJS 
2. Body Parser
3. RequestJS
4. EJS
5. FirebaseAPI
6. Mongoose

 > More details will be added soon

### 📁Folder:**OCRModule**

Just the OCR module bundled up in this folder



