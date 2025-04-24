import sqlite3

#conn=sqlite3.connect('./Expense-Manager/py/fdm.db ')
#db=conn.cursor()
#db.execute("CREATE TABLE Admin(id, email, password)")
#conn.close()

"""
DROP table if exists Admin;
drop table if exists Employee;
drop table if exists "Line Manager";
drop table if exists "Expense Proofs";
drop table if exists "Expense Claims";
drop table if exists Reports;
drop table if exists "Overnight Stay Expense";
drop table if exists "Meal Expense";
drop table if exists "Purchase Expense";
drop table if exists "Travel Expense";
"""

def dbinit():
    conn=sqlite3.connect('./Expense-Manager/py/fdm.db ')
    db=conn.cursor()
    db.executescript("""
        CREATE TABLE Admin(id integer primary key AUTOINCREMENT, email text, password text);
        CREATE TABLE Employee(id integer PRIMARY key AUTOINCREMENT, name text, email text, password text, "claims list" blob, allowance float, "reliability score" float, role text check(role in ('Line Manager', 'Internal Staff', 'Consultant')), location text, currency text);
        CREATE TABLE "Line Manager"(id integer primary key, "employee list" blob, "employee claims" blob, FOREIGN KEY(id) REFERENCES Employee(id));
        CREATE TABLE "Expense Proofs"(id integer PRIMARY key AUTOINCREMENT, image blob, vat real);
        CREATE TABLE "Expense Claims"(id integer PRIMARY key AUTOINCREMENT, employeeid int, "submission date" text, status text check("submission date" in ('Pending', 'Approved', 'Reported')), amount real, currency text, proofid integer, expensedate text, managerid integer, FOREIGN key(employeeid) REFERENCES Employee(id), FOREIGN KEY(proofid) REFERENCES "Expense Proofs"(id));
        CREATE TABLE Reports(id integer primary key AUTOINCREMENT, reason text check(reason in ('Incorrect Info', 'Fraud Suspicion')), details text, claimid integer, employeeid integer, FOREIGN key(employeeid) REFERENCES Employee(id), FOREIGN key (claimid) REFERENCES "Expense Claims"(id));
        CREATE TABLE "Overnight Stay Expense"(id integer primary key AUTOINCREMENT, structuretype text, structurename text, checkoutdate text, claimid int, FOREIGN key(claimid) REFERENCES "Expense Claims"(id));
        create table "Meal Expense"(id integer primary key AUTOINCREMENT, mealtype text, dininglocation text, structuretype text, claimid int, FOREIGN key(claimid) REFERENCES "Expense Claims"(id));
        CREATE TABLE "Purchase Expense"(id integer primary key AUTOINCREMENT, purchasetype text, numberofitems integer, items blob, storeofpurchases text, claimid int, FOREIGN key(claimid) REFERENCES "Expense Claims"(id));
        CREATE TABLE "Travel Expense"(id integer primary key AUTOINCREMENT, transportationtype text, motive text, claimid int, FOREIGN key(claimid) REFERENCES "Expense Claims"(id));
    """)
    conn.close()
    return
#will add temp function to initialise tables
#add functions to run premade queries depending on design outline

#database format
#choose if id is string or auto int
"""
table for Admin
	-id: auto int
	-email: string
    -password: string
    
table for Employee
	-id: auto int/string
	-claims list: blob (list <expense claim IDs>, needs to be retrieved from database)
    -name: string
    -email: string
    -password: string
    -allowance: float
    -reliability score: float
    -role in company:string
    -location: string
    -currency: string
    (internal staff and line managers will use default location and currency and cannot alter it)

table for Line Manager
	-id: int/string (matches employee ID)
    -employee list: blob (list <employee IDs>, needs to be retrieved from database)
    -employee claims: blob (list <expense claim IDs>, needs to be retrieved from database)
    
    
table for Reports
	-id: auto int/string
	-reason: string/enum
    -details: string
    -claimID: int/string
    -employeeID: int/string

(separate tables for difference expense claim types, since expense claim is abstract class and methods for retrieval overridden by types)
    
table for Expense Claims:
	-id: auto int/string
    -employeeID: int/string
    -submissionDate: date
    -status: string/enum
    -amount: float
    -currency: String
    -ProofID: int/string
    -expenseDate: date
    -managerID: int/string


table for Overnight Stay Expense
    -structureType text
    -structureName text
    -checkOutDate text

table for Meal Expense
    -mealType: string
    -diningLocation: string
    -structureType: string
    
table for Purchase Expense
    -purchaseType: string
    -numberOfItems: int
    -items: blob (list String)
    -storeOfPurchase: string
    
table for Travel Expense
    -transportationType: string
    -motive: string
    
table for Expense Proofs
	-id: auto int/string
    -image: blob
    -VAT: float
"""