import travelClaimPf from "../images/IMG_2397.jpg"
import mealOne from "../images/mealOne.jpg"
import mealTwo from "../images/mealTwo.jpg"

  export const myClaims=[{
      id: 'T023AB',
      type: 'Travel',
      amount: '£ 59.99',
      currency: '£ - GBP',
      submission: '21/02/2023',
      expDate: '10/02/2023',
      status: 'PENDING',
      employee: 'Asia Belfiore',
      motive: 'Conference Attendance',
      VAT: 'N/A',
      extra: 'N/A',
      proof: travelClaimPf,
  } , {
    id: 'MC445AB',
    type: 'Meal',
    amount: '£ 11.00',
    currency: '£ - GBP',
    submission: '21/02/2023',
    expDate: '10/02/2023',
    status: 'PENDING',
    employee: 'Asia Belfiore',
    motive: 'Conference Meal',
    VAT: '£ 2.89',
    extra: 'Pret a Manger',
    proof: mealOne,
  }
  , {
    id: 'MC445AB',
    type: 'Meal',
    amount: '£ 11.00',
    currency: '£ - GBP',
    submission: '21/02/2023',
    expDate: '10/02/2023',
    status: 'APPROVED',
    employee: 'Asia Belfiore',
    motive: 'Client meeting meal',
    VAT: '3.44',
    extra: 'Restaurant: Pizzeria Cinquecento',
    proof: mealTwo,
  }]

  export const myEmps=[{
    id: 'AQ001',
    name: 'Ammar Quadir',
    email: 'a.quadir@FDM.uk',
    role: 'Line Manager',
    score: '100%',
    lm: 'Asia Belfiore',
    spent: '£ 62.99',
    allowance: '£ 800.00',
  },{
    id: 'GH202',
    name: 'Gavin Hor',
    email: 'g.hor@FDM.uk',
    role: 'Consultant',
    pendingClaims: '3',
    score: '50%',
    lm: 'Asia Belfiore',
    spent: '£ 88.50',
    allowance: '£ 800.00',
  } ,{
    id: 'VV300',
    name: 'Vasileios Vogiatzis',
    email: 'v.vogiatzis@FDM.uk',
    role: 'Internal Staff',
    score: '100%',
    lm: 'Asia Belfiore',
    spent: '£ 51.99',
    allowance: '£ 600.00',
  },{
    id: 'SB006',
    name: 'Sidharth Bhat',
    email: 's.bhat@FDM.uk',
    role: 'Internal Staff',
    score: '0%',
    lm: 'Asia Belfiore',
    spent: '£ 67.50',
    allowance: '£ 300.00',
  }]

  export const userDetails =[{
    id: '1',
    name: 'Asia Belfiore',
    email: 'a.belfiore@FDM.uk',
    password: 'ciao',
    initials: 'AB',
    role: 'Line Manager',
    allowance: '£ 800',
    spent: '£ 627.44',
    score: '91%',
    currency: '£ - GBP',
    location:'United Kigndom'
    
}];

export function pushElement(element) {
  myClaims.push(element);
}