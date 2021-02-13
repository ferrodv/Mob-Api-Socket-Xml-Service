import socket
import signal
import threading
import time
import socket
import re
import logging
from hashlib import md5
import base64
import xml.etree.ElementTree as ET
import xml.dom.minidom
import xml.etree.cElementTree as e
import json as j
import xmltodict, json
import pprint

class Main(object):

    _socketT = socket.socket(socket.AF_INET, socket.SOCK_STREAM) #TCP
    _socketU = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)  #UDP
    _socket = socket.socket()
    _ipHost = "127.0.0.1"
    _ipClient = ""
    _port = 0
    _portC = 0
    _user = ""
    _finished = False
    _message = ""
    _lengh = 0

    
    def main(self):
        _json = {}
        comando = ''
        accion = ''
        data = ''
        mensaje = ''
        mensaje2 = ''
        mensaje3 = ''
        mensaje4 = ''
        mensaje5 = ''
        
        
        
        """ self._port = self.validarPuertos()  
        print("gracias por el puerto je" + str(self._port))
        self._socket.bind((self._ipHost, self._port))
        self._socket.listen(5) 
        while(True):  
            conex, add = self._socket.accept()
            print("Conexion abierta")
            
        mensaje = conex.recv(1024).decode('utf-8')
        mensaje2 = json.loads(mensaje)
        print(type(mensaje))
        print(type(mensaje2)) """
        """ conex.close() """
            
        """ for i in mensaje2:
            print(i[0], ":", mensaje2[i]['Command'])
            comando = mensaje2[i]['Command']
            accion = mensaje2[i]['accion']
                
        if (comando == 'VOTE_REQUEST'):
            if(accion == 'COMMIT'):
                conex.send('VOTE_COMMIT').encode()
                
            elif (accion == 'ABORT'):
                conex.send('VOTE_ABORT').encode()
                
        elif (comando == 'GLOBAL_COMMIT'):
            if(accion == 'restaurar'):
                mensaje3 = conex.recv(1024).decode('utf-8')
                mensaje5 = self.recibirObjetos()
                conex.send(mensaje5).encode()
                
            elif (accion == 'replicar'):
                mensaje4 = json.loads(mensaje3)
                print(type(mensaje3))
                print(type(mensaje4))
                
                for i in mensaje4:
                    print(i[0], ":", mensaje4[i]['Command'])
                    comando = mensaje4[i]['Command']
                    accion = mensaje4[i]['accion']
                    data = mensaje4[i]['data']
                    self.hacerReplica(data) """
               
        self.hacerReplica()
        self.recibirObjetos()             
        print("intentemos imprimir esta cochinada")
        """ self.hacerReplica() """
        print("luego de imprimir esa cochinada vamos viceversa")
        print("imprimamos un json desde el xml")
           
        """ self.recibirObjetos() """
        
        
    def hacerReplica(self):
        """ _json = data """
        _json = [{"data": [
        {
            "nombre": "perro",
            "fecha": "2021",
            "accion": "COMMIT"
        },
        {
            "nombre": "lobo",
            "fecha": "2021",
            "accion": "ABORT"
        },
        {
            "nombre": "gato",
            "fecha": "2021",
            "accion": "COMMIT"
        }
    ]}] 
        
        print(type(_json))
        print(len(_json))
        
        r = e.Element("data")
        for i in range((3)):
            e.SubElement(r,"nombre").text = _json[0]['data'][i]['nombre']
            e.SubElement(r,"fecha").text = _json[0]['data'][i]['fecha']
            e.SubElement(r,"accion").text = _json[0]['data'][i]['accion']
            
            
        a = e.ElementTree(r)
        a.write("Xml-Server/Xml/uls.xml")
        
        
    def recibirObjetos(self):
        _json = ''
        _json2 = {"data": list()}
                
        with open('uls.xml', 'r') as uls:
            obj = xmltodict.parse(uls.read())
        
        uls.close()
        print(json.dumps(obj, indent=4, sort_keys=True))
        _json = json.dumps(obj, indent=4, sort_keys=False)
        print(type(_json))
        
        _nuevoJson = json.loads(_json)
        print(type(_nuevoJson))
        print(_nuevoJson)
            
        for i in _nuevoJson:
            print(i[0], ":", _nuevoJson[i]['nombre'])
            arrayNombres = _nuevoJson[i]['nombre']
            arrayFechas = _nuevoJson[i]['fecha']
            arrayAccion = _nuevoJson[i]['accion']
            
        for i in range(len(arrayNombres)):
            print(arrayNombres[i])
            print(arrayFechas[i])
            print(arrayAccion[i])
            _json2['data'].append({
                "nombre": arrayNombres[i],
                "fecha": arrayFechas[i],
                "accion": arrayAccion[i]
            })
            
        print(_json2)
        
        
    def validarPuertos(self):
        while(True):
            try:
                entry = input("Ingrese el Puerto: ")
                e = int(entry)
                if ((e < 49152) or (e > 65535)):
                    print("Opcion invalida!! Ingrese un puerto entre 49152 y 65535")
                else:
                    return e
            except ValueError:
                print("Opcion invalida!! Ingrese un puerto(numero) entre 49152 y 65535")
                
            
    def connectT(self):
        try:
            self._socketT.connect((self._ipHost,self._portH))
            print ("Puerto TCP abierto exitosamente")
            return True
        except socket.error:
            print ("Error abriendo puerto TCP de conexion... intentando nuevamente")
            return False 
     
        
if __name__ == "__main__":
    Main().main()