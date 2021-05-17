# **REST API**
## Standard Response JSON
ทุก endpoint จะมี response ที่มีรูปแบบเหมือนกันคือ
| field | Type | Description |  
| ----------- | ----------- | ----------- |  
| `statusCode` | `number` | http status code |  
| `message` | `string \| Array<string>` | คำอธิบายเป็น string ( จะเป็น array ของ string ในกรณี `statusCode` เป็น 400 ) |
| `data` | `any` | ข้อมูลซึ่งจะขึ้นอยู่กับ endpoint |

## Schema
และข้อมูลแต่ละประเภทจะมัรูปแบบดังนี้
### Schedule
| field | Type | Description |  
| ----------- | ----------- | ----------- |  
| `id` | `string` | id การตั้งปลุก |  
| `name` | `string` | ชื่อการตั้งปลุก |  
| `time` | `Date` | เวลาตั้งปลุก |
| `receivers` | `Array<Device>` | array ของข้อมูลเครื่องที่จะรับ |
| `audio` | `Audio` | ข้อมูลของไฟล์เสียงที่ใช้ |
### Audio
| field | Type | Description |  
| ----------- | ----------- | ----------- |  
| `id` | `string` | id ไฟล์เสียง |  
| `name` | `string` | ชื่อไฟล์เสียง |
### Device
| field | Type | Description |  
| ----------- | ----------- | ----------- |  
| `id` | `string` | id เครื่อง |  
| `name` | `string` | ชื่อการเครื่อง |  
| `mqtt_client_id` | `string` | ClientId สำหรับเชื่อมต่อ NETPIE |

---
# **Schedule endpoints**
## /api/schedules
#### Method: `POST`
ใช้สำหรับสร้างการปลุก
### Request JSON 

| field | Type | Description |  
| ----------- | ----------- | ----------- |  
| `name` | `string` | ชื่อการตั้งปลุก |  
| `time` | `Date` | เวลาตั้งปลุก |
| `receivers` | `Array<string>` | array ของ id เครื่องที่จะรับ |
| `audio` | `string` | id ของไฟล์เสียงที่ใช้ (ได้จากการ upload เสียงด้วย [POST api/audios](#apiaudios) ) |  
### Response Data ( ข้อมูลที่อยู่ใน response.data )
ข้อมูลของการปลุกที่สร้างขึ้น มีรูปแบบตาม [Schedule](#Schedule)

### Error
 | status code | Description |  
| ----------- | ----------- |  
| `400` | ข้อมูลผิดรูปแบบ response.message จะเป็น array ของ string ที่อธิบายสิ่งที่ผิด |

## /api/schedules/:id
#### Method: `GET`
ใช้สำหรับดูข้อมูลการปลุกตาม id
### Response Data ( ข้อมูลที่อยู่ใน response.data )
ข้อมูลของการปลุก มีรูปแบบตาม [Schedule](#Schedule)

### Error
 | status code | Description |  
| ----------- | ----------- |  
| `404` | ไม่เจอข้อมูล |

## /api/schedules
#### Method: `GET`
ใช้สำหรับดูข้อมูลการปลุกทั้งหมด
### Response Data ( ข้อมูลที่อยู่ใน response.data )
จะเป็น array ของข้อมูลการปลุก แต่ละ element ใน array มีรูปแบบตาม [Schedule](#Schedule)

## /api/schedules/:id
#### Method: `DELETE`
ใช้สำหรับดลบข้อมูลการปลุกตาม id

### Error
 | status code | Description |  
| ----------- | ----------- |  
| `404` | ไม่เจอข้อมูล |  

# **Audio endpoints**
## /api/audios
#### Method: `POST`
ใช้สำหรับ upload file เสียง
**( endpoint นี้ต้องส่งข้อมูลในรูปแบบ formdata )** \
[ดูตัวอย่างการส่งข้อมูล formdata](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) ( ดูในหัวข้อ uploading a file )
#### Request formdata:

| field | Type | Description |  
| ----------- | ----------- | ----------- |  
| `name` | `string` | ชื่อไฟล์เสียง |
| `file` | `File` | ไฟล์เสียง ( .WAV file ) |

### Response Data ( ข้อมูลที่อยู่ใน response.data )
ข้อมูลของไฟล์เสียงที่ upload มีรูปแบบตาม [Audio](#Audio)

 | status code | Description |  
| ----------- | ----------- |  
| `400` | ข้อมูลผิดรูปแบบ response.message จะเป็น array ของ string ที่อธิบายสิ่งที่ผิด |

## /api/audios/:id
#### Method: `GET`
ใช้สำหรับดูข้อมูลไฟล์เสียงกตาม id
### Response Data ( ข้อมูลที่อยู่ใน response.data )
ข้อมูลของไฟล์เสียง มีรูปแบบตาม [Audio](#Audio)

### Error
 | status code | Description |  
| ----------- | ----------- |  
| `404` | ไม่เจอข้อมูล |

## /api/audios
#### Method: `GET`
ใช้สำหรับดูข้อมูลไฟล์เสียงทั้งหมด ( หากต้องการ file เสียงให้ใช้ [GET /api/audios/:id/file](#apiaudiosidfile) )
## /api/audios/:id/file
#### Method: `GET`
ใช้สำหรับ download ไฟล์เสียง
### Error
 | status code | Description |  
| ----------- | ----------- |  
| `404` | ไม่เจอข้อมูล |
## /api/audios/:id
#### Method: `DELETE`
ใช้สำหรับดลบไฟล์เสียงตาม id

### Error
 | status code | Description |  
| ----------- | ----------- |  
| `404` | ไม่เจอข้อมูล |

# **Device endpoints**
## /api/devices
#### Method: `POST`
ใช้สำหรับเพิ่มเครื่องที่รอรับการปลุก
### Request JSON 

| field | Type | Description |  
| ----------- | ----------- | ----------- |  
| `name` | `string` | ชื่อเครื่อง |  
| `mqtt_client_id` | `string` | ClientId สำหรับเชื่อมต่อ NETPIE |
### Response Data ( ข้อมูลที่อยู่ใน response.data )
ข้อมูลของการปลุกที่สร้างขึ้น มีรูปแบบตาม [Device](#Device)

### Error
 | status code | Description |  
| ----------- | ----------- |  
| `400` | ข้อมูลผิดรูปแบบ response.message จะเป็น array ของ string ที่อธิบายสิ่งที่ผิด |

## /api/devices/:id
#### Method: `GET`
ใช้สำหรับดูข้อมูลเครื่องตาม id
### Response Data ( ข้อมูลที่อยู่ใน response.data )
ข้อมูลของเครื่อง มีรูปแบบตาม [Device](#Device)

### Error
 | status code | Description |  
| ----------- | ----------- |  
| `404` | ไม่เจอข้อมูล |

## /api/devices
#### Method: `GET`
ใช้สำหรับดูข้อมูลเครื่องทั้งหมด
### Response Data ( ข้อมูลที่อยู่ใน response.data )
จะเป็น array ของข้อมูลเครื่อง แต่ละ element ใน array มีรูปแบบตาม [Device](#Device)

## /api/devices/:id
#### Method: `DELETE`
ใช้สำหรับดลบข้อมูลเครื่องตาม id

### Error
 | status code | Description |  
| ----------- | ----------- |  
| `404` | ไม่เจอข้อมูล |  
---
# **MQTT**
**ใน NETPIE อย่าลืมทำให้ device ทั้งหมดอยู่ใน group เดียวกันด้วย**
## @msg/task/:mqtt_client_id
subscribe topic นี้เพื่อรอรับ task ต่างๆ เช่น \
สมุติว่าเครื่องหนึ่งมี ClientId ใน NETPIE เป็น 1234 ก็ให้ subscribe ไปที่ topic `@msg/task/1234`
### message
ข้อความในรูปแบบ `taskType audio_id` โดย `taskType` มี 2 แบบได้แก่ `Download` และ `Play` หมายถึงให้โหลดไฟล์และเล่นไฟล์เสียงตามลำดับ ยกตัวอย่างเช่น \
`Download 1234` หมายถึงให้ download ไฟล์เสียงที่มี id เป็น 1234 (ทำได้โดยยิง HTTP request ไปที่ [GET /api/audios/:id/file](#apiaudiosidfile) ) และบันทึกไว้ใน sd card\
`Play 1234` หมายถึงให้อ่านและเล่นไฟล์เสียงที่มี id เป็น 1234 จาก SD card
## @msg/task/complete
publish ใน topic นี้เพื่อเป็นการยืนยันว่าโหลดเสร็จแล้ว(ในกรณี Download)หรือเป็นการตอบรับการปลุก(ในกรณี Play)
### message
id ของ Task
### ตัวอย่างการ download file ( NodeMCU )
ให้เปลี่ยน `host_name` เป็นที่อยู่ของ backend server และ `audio_id` เป็น id ของไฟล์เสียง
```c++
  myFile = SD.open("audio_id.wav", FILE_WRITE);

  if (myFile) {
    HTTPClient http;
    http.begin("้http://host_name/api/audios/audio_id/file");
    int httpCode = http.GET();
    if(httpCode == 200){
      http.writeToStream(&myFile);
    }
    http.end();
  }
```