from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
import datetime
from classes import *
  
x = datetime.datetime.now()

def populate() -> Registry:
  reg = Registry('./registry.txt')
  #add details json to iterate over for admins
  admin=Admin('testemail@email.com','password',reg)
  reg.addAdmin(admin)
  admin.addEmployee('lmemail@email.com','line','manager','password',"Line Manager",{'location':'testloc','age':21,'gender':'non-binary','breakfast':'cereal first'})
  admin.addEmployee('empemail@email.com','internal','staff','password,',"Internal Staff",{'location':'Ohio','age':'unknown','gender':'yes','breakfast':'no'})
  lm = reg.getEmployee(0)
  lm.addEmployee(reg.getEmployee(1))
  return reg

reg = populate()
app = Flask(__name__)
CORS(app)

"""
So far:
login
get claim details
get employees list
get all personal claims
get all pending claims of employees/self
get employee info
submit claims endpoint
report claim endpoint
approve claim
manage employee allowance
change personal details (password, location, etc.)?

TODO:
"""

#submit claims end point
@app.route('/submitClaim',methods=["POST","GET"])
def submitClaim():
    if request.method=="POST":
        emp = reg.getEmployee(request.id)
        emp.makeExpenseClaim(request.proof, request.expensedate, request.amount, request.currency, request.extraDetails)
        return

@app.route('/approveClaim',methods=["POST","GET"])
def approveClaim():
    if request.method=="POST":
        lm = reg.getEmployee(request.managerid)
        lm.approveClaim(reg.getExpenseClaim(request.claimid))
        return


@app.route('/reportClaim',methods=["POST","GET"])
def reportClaim():
    if request.method=="POST":
        lm = reg.getEmployee(request.managerid)
        lm.reportClaim(reg.getExpenseClaim(request.claimid))
        return

@app.route('/changeAllowance',methods=["POST","GET"])
def changeAllowance():
    if request.method=="POST":
        lm = reg.getEmployee(request.managerid)
        emp = reg.getEmployee(request.employeeid)
        if emp in lm.getMyEmployees():
          emp.changeAllowance(request.maxallowance)
        else:
            print("Error: employee is not under this manager")
            return
      
#login. input email and password. returns id if successful, -1 if unsuccessful
@app.route('/login',methods=["POST","GET"])
def login():
    id = -1
    if request.method=="POST":
        id = reg.tryLoginEmp(request.email,request.password)
        return {'id':id}

#get claim details, input claim ID . returns claim details 
@app.route('/claimdetails',methods=["POST","GET"])
def getClaimDetails():
    if request.method=="POST":
        #change to return JSON
        claim = reg.getExpenseClaim(request.id)
        return claim.getClaimDetails()
    
#get employee list. input manager ID. returns list of employees under manager and their details
@app.route('/employeeslist',methods=["POST","GET"])
def getEmployees():
    if request.method=="POST":
        lm = reg.getEmployee(request.id)
        if lm.role=="Line Manager":
            #change to return json
            emplist = lm.getMyEmployees()
            nlist=[]
            for emp in emplist:
                e={
                    'id':emp.id,
                    'name':emp.name,
                    'email':emp.email,
                    'role':emp.role,
                    'reliabilityScore':emp.reliabilityScore,
                    'allowance':emp.allowance,
                    'maxallowance':emp.maxallowance
                }
                nlist.append(e)
            return nlist
        else:
            print("BackendError: employee is not line manager")
            return

#get claims list. input employee ID. returns all pending and past claims of employee
@app.route('/getclaims',methods=["POST","GET"])
def getClaims():
    if request.method=="POST":
        emp = reg.getEmployee(request.id)
        claims = emp.getClaimList()
        claimlist=[]
        for claim in claims:
            c = {
            'id':claim.id,
            'employeeid':claim.employee.id,
            'submitdate':claim.submitdate,
            'status':claim.status,
            'amount':claim.amount,
            'currency':claim.currency,
            'proofid':claim.proof.id,
            'expensedate':claim.expensedate,
            'managerid':claim.manager.id
            }
            claimlist.append(c)
        return claimlist

#get pending claims. input employee id. if role manager, return pending claims of employees. else, return personal pending claims
@app.route('/pendingclaims',methods=["POST","GET"])
def pendingClaims():
    if request.method=="POST":
        user=reg.getEmployee(request.id)
        if user.role=="Line Manager":
            claims=user.getEmployeeClaims()
        else:
            claims=user.filterClaimsByStatus("Pending")
        claimlist=[]
        for claim in claims:
            c = {
            'id':claim.id,
            'employeeid':claim.employee.id,
            'submitdate':claim.submitdate,
            'status':claim.status,
            'amount':claim.amount,
            'currency':claim.currency,
            'proofid':claim.proof.id,
            'expensedate':claim.expensedate,
            'managerid':claim.manager.id
            }
            claimlist.append(c)
        return claimlist

#get employee info. input employee id, return employee info
@app.route('/employeeinfo',methods=["POST","GET"])
def getEmployeeInfo():
    if request.method=="POST":
        emp = reg.getEmployee(request.id)
        return {
            'id':emp.id,
            'name':emp.name,
            'email':emp.email,
            'role':emp.role,
            'reliabilityScore':emp.reliabilityScore,
            'allowance':emp.allowance,
            'maxallowance':emp.maxallowance,
            'location':emp.personalDetails['location'],
            'age':emp.personalDetails['age'],
            'gender':emp.personalDetails['gender'],
            'breakfast':emp.personalDetails['breakfast']
        }

@app.route('/changeDetails',methods=["POST","GET"])
def changeDetails():
    emp=reg.getEmployee(request.id)
    details=request.details
    fields=details.keys()
    if 'location' in fields:
        emp.changeLocation(details['location'])
        details.pop('location')
        fields.remove('location')
    if 'currency' in fields:
        emp.changeCurrency(details['currency'])
        details.pop('currency')
        fields.remove('currency')
    if 'password' in fields:
        emp.password=details['password']
        details.pop('password')
        fields.remove('password')
    if 'fname' in fields:
        emp.name=details['fname']+details['lname']
    

    for field in fields:
        emp.personalDetails[field]=details[field]

    return

#test call, to deleter
@app.route('/data')
def get_time():
      return {
        'Name':"geek", 
        "Age":"22",
        "Date":x, 
        "programming":"python"
        }
  
      
if __name__ == '__main__':
    app.run(debug=True)