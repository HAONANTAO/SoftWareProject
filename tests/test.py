import json
import time
import unittest
import requests
import logging

logging.basicConfig(filename="./log.log", level=logging.INFO)


class TestAdminAPI(unittest.TestCase):
    def setUp(self):
        self.adminId = json.loads(requests.post("http://localhost:8080/admin/", json={
            'loginID': 'testAdmin30',
            'password': 'testAdminPass',
            'firstName': 'AFname',
            'middleName': 'AMname',
            'lastName':  'ALname'
        }).text)["_id"]
        self.base = 'http://localhost:8080/admin'
        loginResponse = requests.post("http://localhost:8080/admin/login", json={
            'loginID': 'testAdmin30',
            'password': 'testAdminPass',
            'firstName': 'AFname',
            'middleName': 'AMname',
            'lastName': 'ALname'
        })
        self.session = requests.Session()
        self.session.headers.update({
            'Authorization': 'Bearer ' + json.loads(loginResponse.text)['token']
        })

    def test_createDelete(self):
        url = self.base + '/'
        loginID = 'testAdmin1'
        password = 'testAdminPass'
        fName = 'AFname'
        mName = 'AMname'
        lName = 'ALname'
        body = {
            'loginID': loginID,
            'password': password,
            'firstName': fName,
            'middleName': mName,
            'lastName': lName
        }
        response = self.session.post(url, json=body)
        self.assertEqual(201, response.status_code)

        admin = json.loads(response.text)
        self.assertEqual(fName, admin['firstName'])
        self.assertEqual(mName, admin['middleName'])
        self.assertEqual(lName, admin['lastName'])
        self.assertEqual(loginID, admin['loginID'])

        # clean up
        url = self.base + '/login'
        response = self.session.post(url, json=body)
        token = json.loads(response.text)['token']
        headers = {
            'Authorization': 'Bearer ' + token
        }
        url = self.base + '/' + admin['_id']
        response = self.session.delete(url, headers=headers)
        self.assertEqual(204, response.status_code)

    def test_createDuplicate(self):
        url = self.base + '/'
        loginID = 'testAdmin2'
        password = 'testAdminPass'
        fName = 'AFname'
        mName = 'AMname'
        lName = 'ALname'
        body = {
            'loginID': loginID,
            'password': password,
            'firstName': fName,
            'middleName': mName,
            'lastName': lName
        }
        response1 = self.session.post(url, json=body)
        self.assertEqual(201, response1.status_code)
        time.sleep(1)
        response2 = self.session.post(url, json=body)
        self.assertEqual(500, response2.status_code)

        admin = json.loads(response1.text)
        response2_obj = json.loads(response2.text)
        self.assertEqual('Admin loginID already exist.', response2_obj['msg'])

        # clean up
        url = self.base + '/login'
        response = self.session.post(url, json=body)
        token = json.loads(response.text)['token']
        headers = {
            'Authorization': 'Bearer ' + token
        }
        url = self.base + '/' + admin['_id']
        response = self.session.delete(url, headers=headers)
        self.assertEqual(204, response.status_code)

    def test_login_success(self):
        url = self.base + '/'
        loginID = 'testAdmin3'
        password = 'testAdminPass'
        fName = 'AFname'
        mName = 'AMname'
        lName = 'ALname'
        body = {
            'loginID': loginID,
            'password': password,
            'firstName': fName,
            'middleName': mName,
            'lastName': lName
        }
        response = self.session.post(url, json=body)
        self.assertEqual(201, response.status_code)

        admin = json.loads(response.text)
        self.assertEqual(fName, admin['firstName'])
        self.assertEqual(mName, admin['middleName'])
        self.assertEqual(lName, admin['lastName'])
        self.assertEqual(loginID, admin['loginID'])

        # login success
        url = self.base + '/login'
        response = self.session.post(url, json=body)
        self.assertEqual(200, response.status_code)
        self.assertIsNotNone(json.loads(response.text)['token'])

        # clean up
        url = self.base + '/login'
        response = self.session.post(url, json=body)
        token = json.loads(response.text)['token']
        headers = {
            'Authorization': 'Bearer ' + token
        }
        url = self.base + '/' + admin['_id']
        response = self.session.delete(url, headers=headers)
        self.assertEqual(204, response.status_code)

    def test_login_incorrectPassword(self):
        url = self.base + '/'
        loginID = 'testAdmin4'
        password = 'testAdminPass'
        incPassword = 'IncorrectAdminPass'
        fName = 'AFname'
        mName = 'AMname'
        lName = 'ALname'
        body = {
            'loginID': loginID,
            'password': password,
            'firstName': fName,
            'middleName': mName,
            'lastName': lName
        }
        response1 = self.session.post(url, json=body)
        self.assertEqual(201, response1.status_code)
        admin = json.loads(response1.text)
        url = self.base + '/login'
        body2 = {
            'loginID': loginID,
            'password': incPassword,
            'firstName': fName,
            'middleName': mName,
            'lastName': lName
        }
        response = self.session.post(url, json=body2)
        self.assertEqual(403, response.status_code)

        # clean up
        url = self.base + '/login'
        response = self.session.post(url, json=body)
        token = json.loads(response.text)['token']
        headers = {
            'Authorization': 'Bearer ' + token
        }
        url = self.base + '/' + admin['_id']
        response = self.session.delete(url, headers=headers)
        self.assertEqual(204, response.status_code)

    def test_login_incorrectLoginID(self):
        url = self.base + '/'
        loginID = 'testAdmin5'
        incLoginID = 'IncAdmin5'
        password = 'testAdminPass'
        fName = 'AFname'
        mName = 'AMname'
        lName = 'ALname'
        body = {
            'loginID': loginID,
            'password': password,
            'firstName': fName,
            'middleName': mName,
            'lastName': lName
        }
        response1 = self.session.post(url, json=body)
        self.assertEqual(201, response1.status_code)
        admin = json.loads(response1.text)
        url = self.base + '/login'
        body2 = {
            'loginID': incLoginID,
            'password': password,
            'firstName': fName,
            'middleName': mName,
            'lastName': lName
        }
        response = self.session.post(url, json=body2)
        self.assertEqual(403, response.status_code)

        # clean up
        url = self.base + '/login'
        response = self.session.post(url, json=body)
        token = json.loads(response.text)['token']
        headers = {
            'Authorization': 'Bearer ' + token
        }
        url = self.base + '/' + admin['_id']
        response = self.session.delete(url, headers=headers)
        self.assertEqual(204, response.status_code)

    def test_getByID(self):
        url = self.base + '/'
        loginID = 'testAdmin6'
        password = 'testAdminPass'
        fName = 'AFname'
        mName = 'AMname'
        lName = 'ALname'
        body = {
            'loginID': loginID,
            'password': password,
            'firstName': fName,
            'middleName': mName,
            'lastName': lName
        }
        response1 = self.session.post(url, json=body)
        self.assertEqual(201, response1.status_code)
        admin1 = json.loads(response1.text)
        url = self.base + '/login'
        response = self.session.post(url, json=body)
        token = json.loads(response.text)['token']

        url = self.base + '/' + admin1['_id']
        headers = {
            'Authorization': 'Bearer ' + token
        }
        response2 = self.session.get(url, headers=headers)
        self.assertEqual(200, response2.status_code)
        admin2 = json.loads(response2.text)
        self.assertEqual(admin1['_id'], admin2['_id'])

        # clean up
        url = self.base + '/login'
        response = self.session.post(url, json=body)
        token = json.loads(response.text)['token']
        headers = {
            'Authorization': 'Bearer ' + token
        }
        url = self.base + '/' + admin1['_id']
        response = self.session.delete(url, headers=headers)
        self.assertEqual(204, response.status_code)

    def test_update_fName(self):
        url = self.base + '/'
        loginID = 'testAdmin7'
        password = 'testAdminPass'
        fName = 'AFname'
        mName = 'AMname'
        lName = 'ALname'
        body = {
            'loginID': loginID,
            'password': password,
            'firstName': fName,
            'middleName': mName,
            'lastName': lName
        }
        response1 = self.session.post(url, json=body)
        self.assertEqual(201, response1.status_code)
        admin = json.loads(response1.text)
        url = self.base + '/' + admin["_id"]
        body2 = {
            'firstName': 'newFName',
        }
        response = self.session.put(url, json=body2)
        self.assertEqual(200, response.status_code)

        # clean up
        url = self.base + '/login'
        response = self.session.post(url, json=body)
        token = json.loads(response.text)['token']
        headers = {
            'Authorization': 'Bearer ' + token
        }
        url = self.base + '/' + admin['_id']
        response = self.session.delete(url, headers=headers)
        self.assertEqual(204, response.status_code)

    def test_getAll(self):
        url = self.base + '/'
        loginID = 'testAdmin8'
        password = 'testAdminPass'
        fName = 'AFname'
        mName = 'AMname'
        lName = 'ALname'
        body = {
            'loginID': loginID,
            'password': password,
            'firstName': fName,
            'middleName': mName,
            'lastName': lName
        }
        response1 = self.session.post(url, json=body)
        self.assertEqual(201, response1.status_code)
        admin1 = json.loads(response1.text)
        url = self.base + '/login'
        response = self.session.post(url, json=body)
        token = json.loads(response.text)['token']

        url = self.base + '/'
        headers = {
            'Authorization': 'Bearer ' + token
        }
        response2 = self.session.get(url, headers=headers)
        self.assertEqual(200, response2.status_code)
        admins = json.loads(response2.text)
        admins_id = [a['_id'] for a in admins]
        self.assertTrue(admin1['_id'] in admins_id)

        # clean up
        url = self.base + '/login'
        response = self.session.post(url, json=body)
        token = json.loads(response.text)['token']
        headers = {
            'Authorization': 'Bearer ' + token
        }
        url = self.base + '/' + admin1['_id']
        response = self.session.delete(url, headers=headers)
        self.assertEqual(204, response.status_code)

    def tearDown(self) -> None:
        self.session.delete(f"http://localhost:8080/admin/{self.adminId}")


class TestAgeGroup(unittest.TestCase):
    def setUp(self):
        self.adminId = json.loads(requests.post("http://localhost:8080/admin/", json={
            'loginID': 'testAdmin3',
            'password': 'testAdminPass',
            'firstName': 'AFname',
            'middleName': 'AMname',
            'lastName':  'ALname'
        }).text)["_id"]
        self.base = 'http://localhost:8080/ageGroup'
        loginResponse = requests.post("http://localhost:8080/admin/login", json={
            'loginID': 'testAdmin3',
            'password': 'testAdminPass',
            'firstName': 'AFname',
            'middleName': 'AMname',
            'lastName': 'ALname'
        })
        self.session = requests.Session()
        self.session.headers.update({
            'Authorization': 'Bearer ' + json.loads(loginResponse.text)['token']
        })

    def test_getAllAgeGroups(self):
        url = f"{self.base}/"
        response = self.session.get(url)
        self.assertEqual(200, response.status_code)

    def test_getAgeGroupById(self):
        # insert module
        url = "http://localhost:8080/module/"
        body = {"name": "moduleName",
                "materials": [],
                "father_id": "64e6e2d529fcb9a264a6eea3",
                "level": 3}
        response1 = self.session.post(url, json=body)
        logging.info(json.loads(response1.text))
        self.assertEqual("moduleName", json.loads(response1.text)["name"])
        self.assertEqual("64e6e2d529fcb9a264a6eea3",
                         json.loads(response1.text)["father_id"])
        self.assertEqual(3, json.loads(response1.text)["level"])

        # insert coach
        url = "http://localhost:8080/coacher/"
        body = {
            "firstName": "first name",
            "middleName": "middle name",
            "lastName": "last name",
            "age": 20,
            "address": "address",
            "phone": "phone",
            "loginID": "loginID",
            "password": "password"
        }
        response2 = self.session.post(url, json=body)
        self.assertEqual(201, response2.status_code)
        self.assertEqual(body["firstName"], json.loads(
            response2.text)['firstName'])
        self.assertEqual(body["middleName"], json.loads(
            response2.text)['middleName'])
        self.assertEqual(body["lastName"], json.loads(
            response2.text)['lastName'])
        self.assertEqual(body["age"], json.loads(
            response2.text)['age'])
        self.assertEqual(body["address"], json.loads(
            response2.text)['address'])
        self.assertEqual(body["phone"], json.loads(
            response2.text)['phone'])
        self.assertEqual(body["loginID"], json.loads(
            response2.text)['loginID'])
        logging.info(response2.text)

        # add age group
        url = f"{self.base}/"
        body = {
            "name": "name",
            "coaches": [json.loads(response2.text)['_id']],
            "modules": [json.loads(response1.text)['_id']]
        }
        response3 = self.session.post(url, json=body)
        self.assertEqual(200, response3.status_code)
        self.assertEqual(body["name"], json.loads(response3.text)['name'])
        self.assertEqual(body["coaches"], json.loads(
            response3.text)['coaches'])
        self.assertEqual(body["modules"], json.loads(
            response3.text)['modules'])
        logging.info(response3.text)

        # get it
        url = f"{self.base}/{json.loads(response3.text)['_id']}"
        response4 = self.session.get(url, json=body)
        self.assertEqual(200, response4.status_code)
        self.assertEqual(body["name"], json.loads(response4.text)['name'])
        logging.info(response4.text)

        # cleanup
        url = f"http://localhost:8080/coacher/{json.loads(response2.text)['_id']}"
        response5 = self.session.delete(url)
        self.assertEqual(204, response5.status_code)
        logging.info(response5.text)

        url = f"http://localhost:8080/module/{json.loads(response1.text)['_id']}"
        response6 = self.session.delete(url)
        self.assertEqual(204, response6.status_code)
        logging.info(response6.text)

        url = f"{self.base}/{json.loads(response3.text)['_id']}"
        response4 = self.session.delete(url)
        self.assertEqual(204, response4.status_code)
        logging.info(response4.text)

    def test_findAgeGroup(self):
        # insert module
        url = "http://localhost:8080/module/"
        body = {"name": "moduleName",
                "materials": [],
                "father_id": "64e6e2d529fcb9a264a6eea3",
                "level": 3}
        response1 = self.session.post(url, json=body)
        logging.info(json.loads(response1.text))
        self.assertEqual("moduleName", json.loads(response1.text)["name"])
        self.assertEqual("64e6e2d529fcb9a264a6eea3",
                         json.loads(response1.text)["father_id"])
        self.assertEqual(3, json.loads(response1.text)["level"])

        # insert coach
        url = "http://localhost:8080/coacher/"
        body = {
            "firstName": "first name",
            "middleName": "middle name",
            "lastName": "last name",
            "age": 20,
            "address": "address",
            "phone": "phone",
            "loginID": "loginID",
            "password": "password"
        }
        response2 = self.session.post(url, json=body)
        self.assertEqual(201, response2.status_code)
        self.assertEqual(body["firstName"], json.loads(
            response2.text)['firstName'])
        self.assertEqual(body["middleName"], json.loads(
            response2.text)['middleName'])
        self.assertEqual(body["lastName"], json.loads(
            response2.text)['lastName'])
        self.assertEqual(body["age"], json.loads(
            response2.text)['age'])
        self.assertEqual(body["address"], json.loads(
            response2.text)['address'])
        self.assertEqual(body["phone"], json.loads(
            response2.text)['phone'])
        self.assertEqual(body["loginID"], json.loads(
            response2.text)['loginID'])
        logging.info(response2.text)

        # add age group
        url = f"{self.base}/"
        body = {
            "name": "name",
            "coaches": [json.loads(response2.text)['_id']],
            "modules": [json.loads(response1.text)['_id']]
        }
        response3 = self.session.post(url, json=body)
        self.assertEqual(200, response3.status_code)
        self.assertEqual(body["name"], json.loads(response3.text)['name'])
        self.assertEqual(body["coaches"], json.loads(
            response3.text)['coaches'])
        self.assertEqual(body["modules"], json.loads(
            response3.text)['modules'])
        logging.info(response3.text)

        # find it
        url = f"{self.base}/find/{json.loads(response3.text)['name']}"
        response4 = self.session.get(url, json=body)
        self.assertEqual(200, response4.status_code)
        self.assertEqual(body["name"], json.loads(response4.text)[0]['name'])
        self.assertEqual(json.loads(response2.text)['firstName'], json.loads(
            response4.text)[0]['coaches'][0]["firstName"])
        self.assertEqual(json.loads(response2.text)['middleName'], json.loads(
            response4.text)[0]['coaches'][0]["middleName"])
        self.assertEqual(json.loads(response2.text)['lastName'], json.loads(
            response4.text)[0]['coaches'][0]["lastName"])
        self.assertEqual(json.loads(response2.text)['loginID'], json.loads(
            response4.text)[0]['coaches'][0]["loginID"])
        self.assertEqual(json.loads(response2.text)['address'], json.loads(
            response4.text)[0]['coaches'][0]["address"])
        logging.warn(response4.text)

        # cleanup
        url = f"http://localhost:8080/coacher/{json.loads(response2.text)['_id']}"
        response5 = self.session.delete(url)
        self.assertEqual(204, response5.status_code)
        logging.info(response5.text)

        url = f"http://localhost:8080/module/{json.loads(response1.text)['_id']}"
        response6 = self.session.delete(url)
        self.assertEqual(204, response6.status_code)
        logging.info(response6.text)

        url = f"{self.base}/{json.loads(response3.text)['_id']}"
        response4 = self.session.delete(url)
        self.assertEqual(204, response4.status_code)
        logging.info(response4.text)

    def test_createAndDeleteAgeGroup(self):
        # insert module
        url = "http://localhost:8080/module/"
        body = {"name": "moduleName",
                "materials": [],
                "father_id": "64e6e2d529fcb9a264a6eea3",
                "level": 3}
        response1 = self.session.post(url, json=body)
        logging.info(json.loads(response1.text))
        self.assertEqual("moduleName", json.loads(response1.text)["name"])
        self.assertEqual("64e6e2d529fcb9a264a6eea3",
                         json.loads(response1.text)["father_id"])
        self.assertEqual(3, json.loads(response1.text)["level"])

        # insert coach
        url = "http://localhost:8080/coacher/"
        body = {
            "firstName": "first name",
            "middleName": "middle name",
            "lastName": "last name",
            "age": 20,
            "address": "address",
            "phone": "phone",
            "loginID": "loginID",
            "password": "password"
        }
        response2 = self.session.post(url, json=body)
        self.assertEqual(201, response2.status_code)
        self.assertEqual(body["firstName"], json.loads(
            response2.text)['firstName'])
        self.assertEqual(body["middleName"], json.loads(
            response2.text)['middleName'])
        self.assertEqual(body["lastName"], json.loads(
            response2.text)['lastName'])
        self.assertEqual(body["age"], json.loads(
            response2.text)['age'])
        self.assertEqual(body["address"], json.loads(
            response2.text)['address'])
        self.assertEqual(body["phone"], json.loads(
            response2.text)['phone'])
        self.assertEqual(body["loginID"], json.loads(
            response2.text)['loginID'])
        logging.info(response2.text)

        # add age group
        url = f"{self.base}/"
        body = {
            "name": "name",
            "coaches": [json.loads(response2.text)['_id']],
            "modules": [json.loads(response1.text)['_id']]
        }
        response3 = self.session.post(url, json=body)
        self.assertEqual(200, response3.status_code)
        self.assertEqual(body["name"], json.loads(response3.text)['name'])
        self.assertEqual(body["coaches"], json.loads(
            response3.text)['coaches'])
        self.assertEqual(body["modules"], json.loads(
            response3.text)['modules'])
        logging.info(response3.text)

        # delete coach
        url = f"http://localhost:8080/coacher/{json.loads(response2.text)['_id']}"
        response5 = self.session.delete(url)
        self.assertEqual(204, response5.status_code)

        # delete module
        url = f"http://localhost:8080/module/{json.loads(response1.text)['_id']}"
        response6 = self.session.delete(url)
        self.assertEqual(204, response6.status_code)
        logging.info(response6.text)

        # delete it
        url = f"{self.base}/{json.loads(response3.text)['_id']}"
        response4 = self.session.delete(url)
        self.assertEqual(204, response4.status_code)
        logging.info(response4.text)

    def test_updateAgeGroup(self):
        # insert module
        url = "http://localhost:8080/module/"
        body = {"name": "moduleName",
                "materials": [],
                "father_id": "64e6e2d529fcb9a264a6eea3",
                "level": 3}
        response1 = self.session.post(url, json=body)
        logging.info(json.loads(response1.text))
        self.assertEqual("moduleName", json.loads(response1.text)["name"])
        self.assertEqual("64e6e2d529fcb9a264a6eea3",
                         json.loads(response1.text)["father_id"])
        self.assertEqual(3, json.loads(response1.text)["level"])

        # insert coach
        url = "http://localhost:8080/coacher/"
        body = {
            "firstName": "first name",
            "middleName": "middle name",
            "lastName": "last name",
            "age": 20,
            "address": "address",
            "phone": "phone",
            "loginID": "loginID",
            "password": "password"
        }
        response2 = self.session.post(url, json=body)
        self.assertEqual(201, response2.status_code)
        self.assertEqual(body["firstName"], json.loads(
            response2.text)['firstName'])
        self.assertEqual(body["middleName"], json.loads(
            response2.text)['middleName'])
        self.assertEqual(body["lastName"], json.loads(
            response2.text)['lastName'])
        self.assertEqual(body["age"], json.loads(
            response2.text)['age'])
        self.assertEqual(body["address"], json.loads(
            response2.text)['address'])
        self.assertEqual(body["phone"], json.loads(
            response2.text)['phone'])
        self.assertEqual(body["loginID"], json.loads(
            response2.text)['loginID'])
        logging.info(response2.text)

        # add age group
        url = f"{self.base}/"
        body = {
            "name": "name",
            "coaches": [json.loads(response2.text)['_id']],
            "modules": [json.loads(response1.text)['_id']]
        }
        response3 = self.session.post(url, json=body)
        self.assertEqual(200, response3.status_code)
        self.assertEqual(body["name"], json.loads(response3.text)['name'])
        self.assertEqual(body["coaches"], json.loads(
            response3.text)['coaches'])
        self.assertEqual(body["modules"], json.loads(
            response3.text)['modules'])
        logging.info(response3.text)

        # update it
        url = f"{self.base}/{json.loads(response3.text)['_id']}"
        body1 = {
            "name": "name2",
        }
        response4 = self.session.put(url, json=body1)
        self.assertEqual(200, response4.status_code)
        logging.info(response4.text)

        # get it
        url = f"{self.base}/{json.loads(response3.text)['_id']}"
        response5 = self.session.get(url, json=body)
        self.assertEqual(200, response5.status_code)
        self.assertEqual("name2", json.loads(response5.text)['name'])
        logging.info(response5.text)

        # cleanup
        url = f"http://localhost:8080/coacher/{json.loads(response2.text)['_id']}"
        response7 = self.session.delete(url)
        self.assertEqual(204, response7.status_code)
        logging.info(response7.text)

        url = f"http://localhost:8080/module/{json.loads(response1.text)['_id']}"
        response6 = self.session.delete(url)
        self.assertEqual(204, response6.status_code)
        logging.info(response6.text)

        url = f"{self.base}/{json.loads(response3.text)['_id']}"
        response4 = self.session.delete(url)
        self.assertEqual(204, response4.status_code)
        logging.info(response4.text)

    def tearDown(self) -> None:
        self.session.delete(f"http://localhost:8080/admin/{self.adminId}")


class TestMaterial(unittest.TestCase):
    def setUp(self):
        self.adminId = json.loads(requests.post("http://localhost:8080/admin/", json={
            'loginID': 'testAdmin3',
            'password': 'testAdminPass',
            'firstName': 'AFname',
            'middleName': 'AMname',
            'lastName':  'ALname'
        }).text)["_id"]
        self.base = 'http://localhost:8080/material'
        loginResponse = requests.post("http://localhost:8080/admin/login", json={
            'loginID': 'testAdmin3',
            'password': 'testAdminPass',
            'firstName': 'AFname',
            'middleName': 'AMname',
            'lastName': 'ALname'
        })
        self.session = requests.Session()
        self.session.headers.update({
            'Authorization': 'Bearer ' + json.loads(loginResponse.text)['token']
        })

    def test_GetMaterialById(self):
        # create a module
        url = "http://localhost:8080/module/"
        body = {"name": "moduleName",
                "materials": [],
                "father_id": "64e6e2d529fcb9a264a6eea3",
                "level": 3}
        response1 = self.session.post(url, json=body)
        self.assertEqual("moduleName", json.loads(response1.text)["name"])
        self.assertEqual("64e6e2d529fcb9a264a6eea3",
                         json.loads(response1.text)["father_id"])
        self.assertEqual(3, json.loads(response1.text)["level"])
        logging.info(json.loads(response1.text))

        # create a material under the module above
        url = f"{self.base}/"
        body = {"type": "file",
                "name": "name",
                "description": "description",
                "url": "url",
                "content": "content",
                "questions": "questions",
                "isAnswerVisible:": False,
                "module_id": json.loads(response1.text)['_id'],
                "id": 1}
        response2 = self.session.post(url, json=body)
        self.assertEqual(200, response2.status_code)
        self.assertEqual("url", json.loads(
            response2.text)["fileMaterial"]["url"])
        self.assertEqual("description", json.loads(
            response2.text)["fileMaterial"]["description"])
        self.assertEqual("name", json.loads(
            response2.text)["fileMaterial"]["name"])
        logging.info(response2.text)

        # test get, which will get the material above
        url = f'{self.base}/{json.loads(response2.text)["material"]["_id"]}'
        response3 = self.session.get(url, json=body)
        self.assertEqual(200, response2.status_code)
        self.assertEqual("url", json.loads(
            response3.text)["fileMaterial"]["url"])
        self.assertEqual("description", json.loads(
            response3.text)["fileMaterial"]["description"])
        self.assertEqual("name", json.loads(
            response3.text)["fileMaterial"]["name"])
        logging.info(response3.text)

        # clean up
        url = f"http://localhost:8080/module/{json.loads(response1.text)['_id']}"
        response4 = self.session.delete(url)
        self.assertEqual(204, response4.status_code)
        logging.info(response4.text)

    def test_createAndDeleteMaterial(self):
        # create a module
        url = "http://localhost:8080/module/"
        body = {"name": "moduleName",
                "materials": [],
                "father_id": "64e6e2d529fcb9a264a6eea3",
                "level": 3}
        response1 = self.session.post(url, json=body)
        self.assertEqual("moduleName", json.loads(response1.text)["name"])
        self.assertEqual("64e6e2d529fcb9a264a6eea3",
                         json.loads(response1.text)["father_id"])
        self.assertEqual(3, json.loads(response1.text)["level"])
        logging.info(json.loads(response1.text))

        # create a material under the module above
        url = f"{self.base}/"
        body = {"type": "file",
                "name": "name",
                "description": "description",
                "url": "url",
                "content": "content",
                "questions": "questions",
                "isAnswerVisible:": False,
                "module_id": json.loads(response1.text)['_id'],
                "id": 1}
        response2 = self.session.post(url, json=body)
        self.assertEqual(200, response2.status_code)
        self.assertEqual("url", json.loads(
            response2.text)["fileMaterial"]["url"])
        self.assertEqual("description", json.loads(
            response2.text)["fileMaterial"]["description"])
        self.assertEqual("name", json.loads(
            response2.text)["fileMaterial"]["name"])
        logging.info(response2.text)
        logging.info(json.loads(response2.text)["fileMaterial"]["_id"])
        # delete the material
        # url = f'{self.base}/{json.loads(response1.text)["material"]["_id"]}'
        # response3 = self.session.delete(url, json=body)
        # self.assertEqual(204, response3.status_code)
        # logging.info(response3.text)

        # # after deleting, get will get null which means return 404
        # url = f'{self.base}/{json.loads(response2.text)["material"]["_id"]}'
        # response4 = self.session.get(url, json=body)
        # self.assertEqual(404, response4.status_code)
        # self.assertEqual("Material_id do not exist", json.loads(
        #     response4.text)["msg"])
        # logging.info(response4.text)

        # clean up
        url = f"http://localhost:8080/module/{json.loads(response1.text)['_id']}"
        response5 = self.session.delete(url)
        self.assertEqual(204, response5.status_code)
        logging.info(response5.text)

    def test_updateMaterial(self):
        # create a module
        url = "http://localhost:8080/module/"
        body = {"name": "moduleName",
                "materials": [],
                "father_id": "64e6e2d529fcb9a264a6eea3",
                "level": 3}
        response1 = self.session.post(url, json=body)
        self.assertEqual("moduleName", json.loads(response1.text)["name"])
        self.assertEqual("64e6e2d529fcb9a264a6eea3",
                         json.loads(response1.text)["father_id"])
        self.assertEqual(3, json.loads(response1.text)["level"])
        logging.info(json.loads(response1.text))

        # create a material under the module above
        url = f"{self.base}/"
        body1 = {"type": "file",
                 "name": "name",
                 "description": "description",
                 "url": "url",
                 "content": "content",
                 "questions": "questions",
                 "isAnswerVisible:": False,
                 "module_id": json.loads(response1.text)['_id'],
                 "id": 1}
        response2 = self.session.post(url, json=body1)
        self.assertEqual(200, response2.status_code)
        self.assertEqual(body1["url"], json.loads(
            response2.text)["fileMaterial"]["url"])
        self.assertEqual(body1["description"], json.loads(
            response2.text)["fileMaterial"]["description"])
        self.assertEqual(body1["name"], json.loads(
            response2.text)["fileMaterial"]["name"])
        logging.info(response2.text)

        # update the material
        body2 = {
            "name": "name2",
            "description": "description2",
            "url": "url2"}
        url = f'{self.base}/{json.loads(response2.text)["material"]["_id"]}'
        response3 = self.session.put(url, json=body2)
        self.assertEqual(200, response3.status_code)
        self.assertEqual({"acknowledged": True, "modifiedCount": 1, "upsertedId": None,
                         "upsertedCount": 0, "matchedCount": 1}, json.loads(response3.text))
        logging.info(response3.text)

        # after updating, get will get the new material
        url = f'{self.base}/{json.loads(response2.text)["material"]["_id"]}'
        response4 = self.session.get(url)
        self.assertEqual(200, response4.status_code)
        logging.info(response4.text)

        # clean up
        url = f"http://localhost:8080/module/{json.loads(response1.text)['_id']}"
        response5 = self.session.delete(url)
        self.assertEqual(204, response5.status_code)
        logging.info(response5.text)

    def tearDown(self) -> None:
        self.session.delete(f"http://localhost:8080/admin/{self.adminId}")


class TestCoach(unittest.TestCase):
    def setUp(self):
        self.adminId = json.loads(requests.post("http://localhost:8080/admin/", json={
            'loginID': 'testAdmin3',
            'password': 'testAdminPass',
            'firstName': 'AFname',
            'middleName': 'AMname',
            'lastName':  'ALname'
        }).text)["_id"]
        self.base = 'http://localhost:8080/coacher'
        loginResponse = requests.post("http://localhost:8080/admin/login",
                                      json={
                                          'loginID': 'testAdmin3',
                                          'password': 'testAdminPass',
                                          'firstName': 'AFname',
                                          'middleName': 'AMname',
                                          'lastName': 'ALname'
                                      })
        self.session = requests.Session()
        self.session.headers.update({
            'Authorization': 'Bearer ' + json.loads(loginResponse.text)['token']
        })

    def test_getAllCoaches(self):
        url = f"{self.base}/"
        response = self.session.get(url)
        self.assertEqual(200, response.status_code)
        logging.info(response.text)

    def test_getCoachById(self):
        # create a coach
        url = f"{self.base}/"
        body = {
            "firstName": "first name",
            "middleName": "middle name",
            "lastName": "last name",
            "age": 20,
            "address": "address",
            "phone": "phone",
            "loginID": "loginID",
            "password": "password"
        }
        response1 = self.session.post(url, json=body)
        self.assertEqual(201, response1.status_code)
        self.assertEqual(body["firstName"], json.loads(
            response1.text)['firstName'])
        self.assertEqual(body["middleName"], json.loads(
            response1.text)['middleName'])
        self.assertEqual(body["lastName"], json.loads(
            response1.text)['lastName'])
        self.assertEqual(body["age"], json.loads(
            response1.text)['age'])
        self.assertEqual(body["address"], json.loads(
            response1.text)['address'])
        self.assertEqual(body["phone"], json.loads(
            response1.text)['phone'])
        self.assertEqual(body["loginID"], json.loads(
            response1.text)['loginID'])
        logging.info(response1.text)

        # get the coach created above
        url = f"{self.base}/{json.loads(response1.text)['_id']}"
        response2 = self.session.get(url)
        self.assertEqual(201, response1.status_code)
        self.assertEqual(body["firstName"], json.loads(
            response2.text)['firstName'])
        self.assertEqual(body["middleName"], json.loads(
            response2.text)['middleName'])
        self.assertEqual(body["lastName"], json.loads(
            response2.text)['lastName'])
        self.assertEqual(body["age"], json.loads(
            response2.text)['age'])
        self.assertEqual(body["address"], json.loads(
            response2.text)['address'])
        self.assertEqual(body["phone"], json.loads(
            response2.text)['phone'])
        self.assertEqual(body["loginID"], json.loads(
            response2.text)['loginID'])
        logging.info(response1.text)

        # clean up
        url = f"{self.base}/{json.loads(response1.text)['_id']}"
        response3 = self.session.delete(url)
        self.assertEqual(204, response3.status_code)

    def test_findCoach(self):
        # create a coach
        url = f"{self.base}/"
        body = {
            "firstName": "first name",
            "middleName": "middle name",
            "lastName": "last name",
            "age": 20,
            "address": "address",
            "phone": "phone",
            "loginID": "loginID",
            "password": "password"
        }
        response1 = self.session.post(url, json=body)
        self.assertEqual(201, response1.status_code)
        self.assertEqual(body["firstName"], json.loads(
            response1.text)['firstName'])
        self.assertEqual(body["middleName"], json.loads(
            response1.text)['middleName'])
        self.assertEqual(body["lastName"], json.loads(
            response1.text)['lastName'])
        self.assertEqual(body["age"], json.loads(
            response1.text)['age'])
        self.assertEqual(body["address"], json.loads(
            response1.text)['address'])
        self.assertEqual(body["phone"], json.loads(
            response1.text)['phone'])
        self.assertEqual(body["loginID"], json.loads(
            response1.text)['loginID'])
        logging.info(response1.text)

        # get the coach created above
        url = f"{self.base}/find/{json.loads(response1.text)['firstName']}"
        response2 = self.session.get(url)
        self.assertEqual(201, response1.status_code)
        self.assertEqual(body["firstName"], json.loads(
            response2.text)[0]["coach"]['firstName'])
        self.assertEqual(body["middleName"], json.loads(
            response2.text)[0]["coach"]['middleName'])
        self.assertEqual(body["lastName"], json.loads(
            response2.text)[0]["coach"]['lastName'])
        self.assertEqual(body["age"], json.loads(
            response2.text)[0]["coach"]['age'])
        self.assertEqual(body["address"], json.loads(
            response2.text)[0]["coach"]['address'])
        self.assertEqual(body["phone"], json.loads(
            response2.text)[0]["coach"]['phone'])
        self.assertEqual(body["loginID"], json.loads(
            response2.text)[0]["coach"]['loginID'])
        logging.info(response2.text)

        # clean up
        url = f"{self.base}/{json.loads(response1.text)['_id']}"
        response3 = self.session.delete(url)
        self.assertEqual(204, response3.status_code)

    def test_createAndDeleteCoach(self):
        url = f"{self.base}/"
        body = {
            "firstName": "first name",
            "middleName": "middle name",
            "lastName": "last name",
            "age": 20,
            "address": "address",
            "phone": "phone",
            "loginID": "loginID",
            "password": "password"
        }
        response1 = self.session.post(url, json=body)
        self.assertEqual(201, response1.status_code)
        self.assertEqual(body["firstName"], json.loads(
            response1.text)['firstName'])
        self.assertEqual(body["middleName"], json.loads(
            response1.text)['middleName'])
        self.assertEqual(body["lastName"], json.loads(
            response1.text)['lastName'])
        self.assertEqual(body["age"], json.loads(
            response1.text)['age'])
        self.assertEqual(body["address"], json.loads(
            response1.text)['address'])
        self.assertEqual(body["phone"], json.loads(
            response1.text)['phone'])
        self.assertEqual(body["loginID"], json.loads(
            response1.text)['loginID'])
        logging.info(response1.text)

        url = f"{self.base}/{json.loads(response1.text)['_id']}"
        response2 = self.session.delete(url)
        self.assertEqual(204, response2.status_code)

    def test_update_coach(self):
        # create a coach
        url = f"{self.base}/"
        body = {
            "firstName": "first name",
            "middleName": "middle name",
            "lastName": "last name",
            "age": 20,
            "address": "address",
            "phone": "phone",
            "loginID": "loginID",
            "password": "password"
        }
        response1 = self.session.post(url, json=body)
        self.assertEqual(201, response1.status_code)
        self.assertEqual(body["firstName"], json.loads(
            response1.text)['firstName'])
        self.assertEqual(body["middleName"], json.loads(
            response1.text)['middleName'])
        self.assertEqual(body["lastName"], json.loads(
            response1.text)['lastName'])
        self.assertEqual(body["age"], json.loads(
            response1.text)['age'])
        self.assertEqual(body["address"], json.loads(
            response1.text)['address'])
        self.assertEqual(body["phone"], json.loads(
            response1.text)['phone'])
        self.assertEqual(body["loginID"], json.loads(
            response1.text)['loginID'])
        logging.info(response1.text)

        # update the coach
        url = f"{self.base}/{json.loads(response1.text)['_id']}"
        body2 = {
            "firstName": "first name2",
            "middleName": "middle name2",
            "lastName": "last name2",
            "age": 22,
            "address": "address2",
            "phone": "phone2",
            "loginID": "loginID2",
            "password": "password2"
        }
        response2 = self.session.put(url, json=body2)
        self.assertEqual(200, response2.status_code)
        logging.info(response2.text)

        # get the coach updated above
        url = f"{self.base}/{json.loads(response1.text)['_id']}"
        response3 = self.session.get(url)
        self.assertEqual(201, response1.status_code)
        self.assertEqual(body2["firstName"], json.loads(
            response3.text)['firstName'])
        self.assertEqual(body2["middleName"], json.loads(
            response3.text)['middleName'])
        self.assertEqual(body2["lastName"], json.loads(
            response3.text)['lastName'])
        self.assertEqual(body2["age"], json.loads(
            response3.text)['age'])
        self.assertEqual(body2["address"], json.loads(
            response3.text)['address'])
        self.assertEqual(body2["phone"], json.loads(
            response3.text)['phone'])
        self.assertEqual(body2["loginID"], json.loads(
            response3.text)['loginID'])
        logging.info(response3.text)

        # clean up
        url = f"{self.base}/{json.loads(response1.text)['_id']}"
        response5 = self.session.delete(url)
        self.assertEqual(204, response5.status_code)

    def tearDown(self) -> None:
        self.session.delete(f"http://localhost:8080/admin/{self.adminId}")


class TestModules(unittest.TestCase):
    def setUp(self):
        self.adminId = json.loads(requests.post("http://localhost:8080/admin/", json={
            'loginID': 'testAdmin3',
            'password': 'testAdminPass',
            'firstName': 'AFname',
            'middleName': 'AMname',
            'lastName':  'ALname'
        }).text)["_id"]
        self.base = 'http://localhost:8080/module'
        loginResponse = requests.post("http://localhost:8080/admin/login", json={
            'loginID': 'testAdmin3',
            'password': 'testAdminPass',
            'firstName': 'AFname',
            'middleName': 'AMname',
            'lastName': 'ALname'
        })
        self.session = requests.Session()
        self.session.headers.update({
            'Authorization': 'Bearer ' + json.loads(loginResponse.text)['token']
        })

    def test_getAllModules(self):
        url = f"{self.base}/"
        response = self.session.get(url)
        logging.info(response.text)
        self.assertEqual(200, response.status_code)

    def test_createAndDeleteANewModule(self):
        url = f"{self.base}/"
        body = {"name": "moduleName",
                "materials": [],
                "father_id": "64e6e2d529fcb9a264a6eea3",
                "level": 3}
        response = self.session.post(url, json=body)
        logging.info(json.loads(response.text))
        self.assertEqual("moduleName", json.loads(response.text)["name"])
        self.assertEqual("64e6e2d529fcb9a264a6eea3",
                         json.loads(response.text)["father_id"])
        self.assertEqual(3, json.loads(response.text)["level"])

        url = f"{self.base}/{json.loads(response.text)['_id']}"
        response = self.session.delete(url)
        logging.info(response.text)
        self.assertEqual(204, response.status_code)

    def test_getById(self):
        # create
        url = f"{self.base}/"
        body = {"name": "moduleName",
                "materials": [],
                "father_id": "64e6e2d529fcb9a264a6eea3",
                "level": 3}
        response1 = self.session.post(url, json=body)
        logging.info(json.loads(response1.text))
        self.assertEqual("moduleName", json.loads(response1.text)["name"])
        self.assertEqual("64e6e2d529fcb9a264a6eea3",
                         json.loads(response1.text)["father_id"])
        self.assertEqual(3, json.loads(response1.text)["level"])

        url = f"{self.base}/{json.loads(response1.text)['_id']}"
        response2 = self.session.get(url)
        self.assertEqual(200, response2.status_code)
        self.assertEqual(json.loads(response1.text),
                         json.loads(response2.text))

        # delete
        url = f"{self.base}/{json.loads(response1.text)['_id']}"
        response3 = self.session.delete(url)
        logging.info(response3.text)
        self.assertEqual(204, response3.status_code)

    def test_updateModule(self):
        # create
        url = f"{self.base}/"
        body = {"name": "moduleName",
                "materials": [],
                "father_id": "64e6e2d529fcb9a264a6eea3",
                "level": 3}
        response1 = self.session.post(url, json=body)
        logging.info(json.loads(response1.text))
        self.assertEqual("moduleName", json.loads(response1.text)["name"])
        self.assertEqual("64e6e2d529fcb9a264a6eea3",
                         json.loads(response1.text)["father_id"])
        self.assertEqual(3, json.loads(response1.text)["level"])

        # modified
        url = f"{self.base}/{json.loads(response1.text)['_id']}"
        response2 = self.session.put(url, json={"name": "moduleName2"})
        self.assertEqual(200, response2.status_code)
        logging.info(response2.text)
        self.assertEqual({"acknowledged": True, "modifiedCount": 1, "upsertedId": None, "upsertedCount": 0, "matchedCount": 1},
                         json.loads(response2.text))
        # test if the name was modified
        url = f"{self.base}/{json.loads(response1.text)['_id']}"
        response2 = self.session.get(url)
        self.assertEqual(200, response2.status_code)
        self.assertEqual("moduleName2",
                         json.loads(response2.text)["name"])

        # delete
        url = f"{self.base}/{json.loads(response1.text)['_id']}"
        response3 = self.session.delete(url)
        logging.info(response3.text)
        self.assertEqual(204, response3.status_code)

    def test_getSubModuleById(self):
        # create
        url = f"{self.base}/"
        body = {"name": "moduleName",
                "materials": [],
                "father_id": "64e6e2d529fcb9a264a6eea3",
                "level": 3}
        response1 = self.session.post(url, json=body)
        logging.info(json.loads(response1.text))
        self.assertEqual("moduleName", json.loads(response1.text)["name"])
        self.assertEqual("64e6e2d529fcb9a264a6eea3",
                         json.loads(response1.text)["father_id"])
        self.assertEqual(3, json.loads(response1.text)["level"])

        url = f"{self.base}/subModule/{json.loads(response1.text)['father_id']}"
        response2 = self.session.get(url)
        logging.info(response2.text)
        self.assertEqual(200, response2.status_code)
        self.assertEqual(json.loads(response1.text)["_id"],
                         json.loads(response2.text)[0]["_id"])
        self.assertEqual(json.loads(response1.text)["name"],
                         json.loads(response2.text)[0]["name"])
        self.assertEqual(json.loads(response1.text)["father_id"],
                         json.loads(response2.text)[0]["father_id"])
        self.assertEqual(json.loads(response1.text)["level"],
                         json.loads(response2.text)[0]["level"])

        # delete
        url = f"{self.base}/{json.loads(response1.text)['_id']}"
        response3 = self.session.delete(url)
        logging.info(response3.text)
        self.assertEqual(204, response3.status_code)

    def test_getMaterialsByModuleId(self):
        # create
        url = f"{self.base}/"
        body = {"name": "moduleName",
                "materials": [],
                "father_id": "64e6e2d529fcb9a264a6eea3",
                "level": 3}
        response1 = self.session.post(url, json=body)
        logging.info(json.loads(response1.text))
        self.assertEqual("moduleName", json.loads(response1.text)["name"])
        self.assertEqual("64e6e2d529fcb9a264a6eea3",
                         json.loads(response1.text)["father_id"])
        self.assertEqual(3, json.loads(response1.text)["level"])

        url = f"{self.base}/materials/{json.loads(response1.text)['_id']}"
        response2 = self.session.get(url)
        logging.info(response2.text)
        self.assertEqual(200, response2.status_code)

        # delete
        url = f"{self.base}/{json.loads(response1.text)['_id']}"
        response3 = self.session.delete(url)
        logging.info(response3.text)
        self.assertEqual(204, response3.status_code)

    def tearDown(self) -> None:
        self.session.delete(f"http://localhost:8080/admin/{self.adminId}")


if __name__ == '__main__':
    suite = unittest.TestLoader().discover("./", "test*.py")
    f = open("./report.txt", "w", encoding="utf-8")
    runner = unittest.TextTestRunner(stream=f, verbosity=2)
    runner.run(suite)
    f.close()
