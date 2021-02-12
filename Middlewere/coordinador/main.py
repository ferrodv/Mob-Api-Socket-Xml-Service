import socket
import signal
import threading
import time
import socket
import re
import logging
from hashlib import md5
import base64

class Main:

    _socketT = socket.socket(socket.AF_INET, socket.SOCK_STREAM) #TCP
    _socketU = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)  #UDP
    _ipHost = "10.2.126.2"
    _ipClient = "127.0.0.1"
    _portH = 19876
    _portC = 9876
    _user = "usuario_1"
    _finished = False
    _message = ""
    _lengh = 0

    def Validate_Port(self):  #Validate user inputs
        while(True):
            try:
                entry = input("Ingrese el Puerto: ")
                e = int(entry)
                if (e < 49152 or (e > 65535)):
                    self.cls(1)
                    print("Opcion invalida!! Ingrese un puerto entre 49152 y 65535")
                else:
                    return e
            except ValueError:
                self.cls(25)
                print("Opcion invalida!! Ingrese un puerto(numero) entre 49152 y 65535")


    def cls(self, num):
        print ("\n" * num)

    
    def connectT(self):
        try:
            self._socketT.connect((self._ipHost,self._portH))
            print ("Puerto TCP abierto exitosamente")
            return True
        except socket.error:
            print ("Error abriendo puerto TCP de conexion... intentando nuevamente")
            return False


    def connectU(self):
        try:
            self._socketU.bind((self._ipClient, self._portC))
            print ("Puerto UDP abierto exitosamente")
            return True
        except socket.error:
            print ("Error abriendo puerto UDP de conexion... intentando nuevamente")
            return False


    def helloiam(self):
        command = "helloiam {}".format(self._user) 
        self._socketT.send(command.encode())
        time.sleep(1)
        answer = self._socketT.recv(1024).decode()
        counter = 0
        while((not answer) and (counter < 20)):
            time.sleep(1)
            answer = self._socketT.recv(1024).decode()
            counter += 1
        if("ok" not in answer):
            print("sucedio un error... usuario no aceptado")
        else:
            pass
        return answer


    def msglen(self):
        command = "msglen"
        self._socketT.send(command.encode())
        time.sleep(1)
        answer = self._socketT.recv(1024).decode()
        counter = 0
        while((not answer) and (counter < 20)):
            time.sleep(1)
            answer = self._socketT.recv(1024).decode()
            counter += 1
        if("ok" not in answer):
            print("sucedio un error... problema sincronizando tamaño del mensaje")
        else:
            n = answer.strip('ok')
            try:
                self._lengh = int(n)
                return answer
            except ValueError:
                print("Error decifrando mensaje")
        return answer


    def givememsg(self):
        command = "givememsg {}".format(self._portC) 
        self._socketT.send(command.encode())
        time.sleep(1)
        answer = self._socketT.recv(1024).decode()
        counter = 0
        while((not answer) and (counter < 20)):
            time.sleep(1)
            answer = self._socketT.recv(1024).decode()
            counter += 1
        if("ok" not in answer):
            print("sucedio un error... consulta de mensaje denegada")
        else:
            pass
        return answer


    def chkmsg(self):
        check = md5(self._message.encode()) 
        command = "chkmsg {}".format(check.hexdigest()) 
        self._socketT.send(command.encode())
        time.sleep(1)
        answer = self._socketT.recv(1024).decode()
        counter = 0
        while((not answer) and (counter < 20)):
            time.sleep(1)
            answer = self._socketT.recv(1024).decode()
            counter += 1
        if("ok" not in answer):
            print("sucedio un error... Mensaje corrompido")
        else:
            pass
        return answer


    def bye(self):
        command = "bye"
        self._socketT.send(command.encode())
        time.sleep(1)
        answer = self._socketT.recv(1024).decode()
        counter = 0
        while((not answer) and (counter < 20)):
            time.sleep(1)
            answer = self._socketT.recv(1024).decode()
            counter += 1
        if("ok" not in answer):
            print("sucedio un error... no se pudo cerrar sesion")
        else:
            pass
        return answer


    def listenPort(self):
        counter = 0
        while(counter < 20):
            counter += 1
            time.sleep(1)
        answer,_address = self._socketU.recvfrom(1024) # buffer size is 1024 bytes
        self._message = (base64.b64decode(answer).decode())
        if(self._lengh == len(self._message)):
            print("Mensaje recibido: {}".format(self._message))
        elif(len(self._message) == 0):
            print("Error, mensaje no recibido... tiempo de respuesta muy largo")
        else:
            print("Error, mensaje corrompido")



    def main(self):
        try:
            while (self._finished == False):
                while(True):
                    status = ""

                    self._user = input("Hola bienvendo, ingrese su nombre de usuario: ")
                    self._portC = self.Validate_Port()
                    #self._ipHost = input("Ingrese la ip del servidor: ")
                    self._ipClient = input("Ingrese la ip del usuario dentro del VPN: ")

                    counter = 0
                    while((self.connectT() == False) and (counter < 10)):
                        time.sleep(1)
                        counter += 1
                    if(counter >= 10):
                        print("intentos saturados, intente otro puerto")
                        break

                    counter = 0
                    while((self.connectU() == False) and (counter < 10)):
                        time.sleep(1)
                        counter += 1
                    if(counter >= 10):
                        print("intentos saturados, intente otro puerto")
                        break

                    t = threading.Thread(target=self.listenPort, name='Listener')
                    print("Procediendo...")
                    status = self.helloiam()
                    if ("ok" in status):
                        status = self.msglen()                  
                        t.start()
                        if ("ok" in status):
                            status = self.givememsg()
                            if ("ok" in status):
                                time.sleep(21)
                                status = self.chkmsg()
                                if ("ok" in status):
                                    status = self.bye()
                                    if ("ok" in status):
                                        self._finished = True
                    self._socketT.close()
                    self._socketU.close()
                    break            
            print("Conexion realizada satisfactoriamente")
        except KeyboardInterrupt:
            print("\n Bye...")
            self._socketT.close()
            self._socketU.close()




            


    