
function checkUPC(upc = null) {
    if(!upc || (typeof upc !== 'string' && typeof upc !== 'number') ) {
        return false;
    }
    upc = upc.toString().split('');

    //base case has all 12 digits
    if(upc.length === 12) {
        console.log(upc);
        return upc.reduce((sum,value,index) =>{
            if(index === 11) {
                let checksum = sum%10 ;
                if(checksum > 0) {
                    checksum = 10 - checksum;
                }
                return checksum === parseInt(upc[11],10);
            }
            if(index < 11) {
                //first 11 digits
                if((index+1)%2 === 0) { // +1 cause index starts 0
                    //even
                    return sum + parseInt(value,10);
                } else {
                    //odd
                    return sum + 3*parseInt(value,10);
                }
            }
            return false;
        },0);
    } else {
        return false;
    }

}

function leadingOrChecksum(upc) {
    let suggestions = [];

    //find checksum
    let upcArr = upc.toString().split('');
    let checkSum = upcArr.reduce((sum,value,index) => {
        if (index === 10) {
            sum += 3 * parseInt(value, 10);
            console.log("sum",sum);
            let checksum = sum%10 ;
            if(checksum > 0) {
                checksum = 10 - checksum;
            }
            return checksum
        }
        if (index < 10) {
            //first 11 digits
            if ((index + 1) % 2 === 0) { // +1 cause index starts 0
                //even
                return sum + parseInt(value, 10);
            } else {
                //odd
                return sum + 3 * parseInt(value, 10);
            }
        }
        return false;
    },0);

    console.log("checksum",upc+checkSum);
    if(checkUPC(upc+checkSum)) {
        suggestions.push(upc+checkSum);
    }
    //find leading number
    for(let i = 0; i<10;i++) {
        let withLeading = checkUPC(i+upc);
        if(withLeading) {
            suggestions.push(i+upc);
        }

    }
    console.log("suggestions",suggestions);
    return suggestions;
}


function upcSuggest(upc) {
    let upcLen = upc.length;
    let suggestions = [];
    //TODO 11 digits case missing checksum vs leading number or 0
    //give two suggestions with checksum or with leading number/0
    if(upcLen === 11) {
        let sC  = leadingOrChecksum(upc);
        suggestions = suggestions.concat(sC);
    }
    //TODO 13 digits case check first and last 12 digits
    //give the two valid suggestions
    if(upcLen === 13) {
        let s1 = upc.substr(0,12);
        let s2 = upc.substr(1,13);
        if(checkUPC(s1)){suggestions.push(s1)}
        if(checkUPC(s2)){suggestions.push(s2)}
    }
    return suggestions; //no suggestions means "invalid"
}

//assumed input "082184090466,083085300265,889714000045" or "082184090466"
function upcValidator(input = null) {
    if(!input) return {};
    input = input.split(',');

    //return hash of keys and if its valid or not
    let hashMap = {};
    let isAllValid = true;
    for( let index in input ) {
        //TODO clean empty inputs ie dual comma
        //TODO cleanse trailing whitespace and ' "
        if(input.hasOwnProperty(index) && input[index]){
            /*
             ::trailing
             [\s\t"']{1,}$
             ::start
             ^[\s\t"']{1,}
             */
            let upc = input[index].replace(/[\s\t"']{1,}$/,"").replace(/^[\s\t"']{1,}/,"");
            console.log(upc);

            let isValid = checkUPC(upc);
            let suggestions = null;
            if(!isValid) {
                //if not valid try adding suggestions
                suggestions=upcSuggest(upc);
                isAllValid=false;
            }
            hashMap[upc] = {isValid, suggestions};
        }
    }

    return {hashMap,isAllValid};
}

export default upcValidator;