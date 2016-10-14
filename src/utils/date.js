export let today = new Date();
export let dd = today.getDate();
let mm = today.getMonth() + 1; //January is 0!
let yyyy = today.getFullYear();

// if(dd<10) {
//     dd='0'+dd
// }

if (mm < 10) {
    mm = '0' + mm;
}
today = mm + dd;
// if (today && today.indexOf(0) !== -1) {
  // today = today.slice(1);
// }
// today = mm+'/'+dd+'/'+yyyy;
if (mm = 11) {
  // payMonth = payReceive.nov
  // payMonth.forEach(function (pay) {
  //   // console.log(pay)
  //   dueDate.forEach(function (due, index) {
  //     if ((pay + 6) <= due) {
  //       // console.log('Due: ' + dueDate[index])

  //     }

  //   })
  // })
}

// export today;
// export dd;
// export mm;
