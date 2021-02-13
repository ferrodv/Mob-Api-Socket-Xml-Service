import socket
import signal
import threading
import time
import socket
import re
import logging
from hashlib import md5
import base64
from datetime import datetime


class Main:

    _socketT_Sev_1 = socket.socket(socket.AF_INET, socket.SOCK_STREAM) #TCP
    _socketT_Sev_2 = socket.socket(socket.AF_INET, socket.SOCK_STREAM) #TCP
    _socketT_Api = socket.socket(socket.AF_INET, socket.SOCK_STREAM) #TCP
    
    _ipServer_1 = 'localhost'
    _portServer_1 = 3200

    _ipServer_2 = 'localhost'
    _portServer_2 = 3300

    _ipLocal = 'localhost'
    _portLocal = 3100

    _waiting = True
    _finished = False
    _apiCommand = ""

    def Validate_Port(self, num):  #Validate user inputs
        while(True):
            try:
                entry = input("Ingrese el Puerto del servidor {}: ".format(num))
                e = int(entry)
                if ((e < 3200) or (e > 3300)):
                    self.cls(1)
                    print("Opcion invalida!! Ingrese un puerto entre 3100 y 3300")
                else:
                    return e
            except ValueError:
                self.cls(25)
                print("Opcion invalida!! Ingrese un puerto(numero) entre 3100 y 3300")


    def cls(self, num):
        print ("\n" * num)

    def getTime(self):
        dateTimeObj = datetime.now()
        return ("[" + str(dateTimeObj.year) + '/' + str(dateTimeObj.month) + '/' + str(dateTimeObj.day) + " " +  str(dateTimeObj.hour) + ':' + str(dateTimeObj.minute) + ':' + str(dateTimeObj.second) + "] ")

    
    def connect_XmlServers(self):
        try:
            self._socketT_Sev_1.connect((self._ipServer_1, self._portServer_1))
            self._socketT_Sev_2.connect((self._ipServer_2, self._portServer_2))
            print (self.getTime() + "Puertos TCP de servidores XML abiertos exitosamente")
            return True
        except socket.error:
            print (self.getTime() + "Error abriendo puertos TCP de conexion... intentando nuevamente")
            return False
    

    def connect_Api(self):
        server_address = (self._ipLocal, self._portLocal)
        try:
            self._socketT_Api.bind(server_address)
            print (self.getTime() + "Puerto TCP escuchando exitosamente")
            self._socketT_Api.listen()
            print(self.getTime() + "Esperando Request...")
            return True
        except socket.error:
            print (self.getTime() + "Error abriendo puerto TCP de conexion... intentando nuevamente")
            return False


    def listen_Api_Port(self, conexion):
        while(True):
            try:
                self._finished = False
                replicar = False
                restaurar = False
                while(self._finished == False):
                    self._apiCommand = conexion.recv(1024).decode('utf-8')
                    print(self._apiCommand)
                    if(replicar == False and restaurar == False):
                        if (self._apiCommand == 'replicar_commit'):
                            conexion.sendall("commit".encode())
                            replicar = True

                        elif (self._apiCommand == 'replicar_abort'):
                            conexion.sendall("abort".encode())

                        elif (self._apiCommand == 'restaurar_commit'):
                            conexion.sendall("commit".encode()) 
                            restaurar = True

                        elif (self._apiCommand == 'restaurar_abort'):
                            conexion.sendall("abort".encode())

                        elif (self._apiCommand == 'OK'):
                            self._finished = True

                    elif(replicar == True and restaurar == False):
                            self._finished = True
                            print(self._apiCommand) 

                    elif(replicar == False and restaurar == True):
                            self._finished = True                                  
            finally:
                self._finished = False
                self._apiCommand = ""

    def replicar_Objetos(self):
        pass

    def restaurar_Objetos(self):
        pass

    def main(self):
        try:
            while (self._finished == False):
                while(True):
                    #self._portServer_1 = self.Validate_Port(1)
                    #self._portServer_2 = self.Validate_Port(2)
                    #self._ipServer_1 = input("Ingrese la ip del servidor 1 dentro del VPN: ")
                    #self._ipServer_2 = input("Ingrese la ip del servidor 2 dentro del VPN: ")
                    # All setted
                    counter = 0
                    #while((self.connect_XmlServers() == False) and (counter < 10)):
                    #    time.sleep(1)
                    #    counter += 1
                    #if(counter >= 10):
                    #    print("intentos saturados, intente otros puertos")
                    #    break
                    while((self.connect_Api() == False) and (counter < 10)):
                            time.sleep(1)                 
                            self._socketT_Api.close()                      
                            counter += 1
                            if(counter >= 10):
                                print("intentos saturados, intente otro puerto")
                                break
                    conexion, _ipApi = self._socketT_Api.accept() # Aceptando conexion
                    while(True):
                        counter = 0
                        t = threading.Thread(target=self.listen_Api_Port(conexion), name='Listener')
                        t.start()
                        #self.listen_Api_Port(conexion)
                        print("Sali")
            print("Conexion realizada satisfactoriamente")
        except KeyboardInterrupt:
            print("\n Bye...")
            self._socketT_Sev_1.close()
            self._socketT_Sev_2.close()
            self._socketT_Api.close()




            


    