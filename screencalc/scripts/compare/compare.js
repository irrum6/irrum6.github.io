populate("#phratio1");
populate("#phratio2");

q("button").addEventListener('click', (event) => {
    //phone 1 and 2 diagonal
    let diag1 = lib.float(val("#phdiag1"));
    let diag2 = lib.float(val("#phdiag2"));
    //phone 1 and 2 aspect ratios
    let rat1, rat2;
    //get them
    {
        //get strings and split
        let arr1 = val("#phratio1").split("/");
        let arr2 = val("#phratio2").split("/");
        rat1 = lib.int(arr1[0]) / lib.int(arr1[1]);
        rat2 = lib.int(arr2[0]) / lib.int(arr2[1]);
    }
    //do calculations

    //phone 1 width
    let h1 = Math.sqrt((diag1 * diag1) / (1 + rat1 * rat1));
    let w1 = h1 * rat1;

    let h2 = Math.sqrt((diag2 * diag2) / (1 + rat2 * rat2));
    let w2 = h2 * rat2;

    //console.log(w1, h1);
    //console.log(w2, h2);
    let inches = true;

    //multiplicator
    let m = Math.floor((window.innerWidth * 0.8) / w1);

    q("#phone1").style.width = (m * w1) + 'px';
    q("#phone1").style.height = (m * h1) + 'px';
    q("#phone1").style.backgroundColor = 'green';

    q("#phone2").style.width = (m * w2) + 'px';
    q("#phone2").style.height = (m * h2) + 'px';
    q("#phone2").style.backgroundColor = 'orange';
});