### 生成密码文件，省去输入密码
```
openssl genrsa -des3 -passout pass:123456 -out key/server.pass.key 2048 
openssl rsa -passin pass:123456 -in key/server.pass.key -out key/server.key
```

### 生成证书请求文件CSR
```
openssl req -new -key key/server.key -out key/server.csr 
```

### 生成证书

```
openssl x509 -req -days 3650 -in key/server.csr -signkey key/server.key -out key/server.crt
```


### 生成证书和秘要
```
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -keyout localhost-privkey.pem -out localhost-cert.pem# http2-node
