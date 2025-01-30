// const isVariified = '';
// if(isVariified){
//     console.log("Variified");
// }
// else{
//     console.log("Not Variified");
// }

// console.log(`$(isVariified === true ? "Varified": "is not Varified")`); // Ternary Operator 

function timeString(time){
    const year = parseInt(time/31536000);
    let remainingDays = time%31536000;
    const days = parseInt(remainingDays/86400);
    const hour = parseInt(days/3600);
    let remainingMinutes = time%3600;
    const minutes = parseInt(remainingMinutes/60);
    const seconds = remainingMinutes%60;
    return `${year}y ${days} d ${hour}h ${minutes}m ${seconds}s`;
}
console.log(timeString(555555));
 