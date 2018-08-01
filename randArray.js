/* BY ZIMONH 2018 URL:https://github.com/zimonh/randArray.js
License: https://creativecommons.org/licenses/by-nc-sa/4.0/ */
const randArray = (inp,length) => {

	const
		fun = {
			//calculate bin.length
			l(dec){	let pow = 2, r = 1; dec -= 1; while (dec > 1) {	dec -= pow;	pow = pow * 2; r++;	}return r;},
			//calculate bin group for fill with '◊' so 128 if 100
			g(dec){return 2 ** fun.l(dec);},
			//Convert Decimal to binary with fixed length of in this case 32 bit
			d(dec, leng){ let out = ''; while (leng--) out += (dec >> leng) & 1;	return out;},
			//get first or last half of options
			h(i, bin){return (bin === '1') ? i.slice(i.length / 2, i.length) : i.slice(0, i.length / 2);},
			//reset
			r(){ crypt.t = crypt.b;	input.t = input.v; input.r = null;}
		},

		input = {
			//input
			v: inp,
			//input length
			l: inp.length,
			//input temp
			t: '',
			//input temp.length
			tl(){return this.t.length;},
			//temp array
			a:[],
			//result
			r:null
		},

		crypt = {
			//binary string
			b: window.crypto
				//chunk length based on length input.length and loss
				.getRandomValues(new Uint32Array((fun.l(input.l)*length/445)*fun.g(input.l)/input.l*16))
				//create string of ones and zeros
				.toString(2).split(',').map(e => fun.d(e,32)).join(''),
			//temp binary string
			t:''
		};


	//fill options to make it a round binary number
	input.v.push(...Array(fun.g(input.l)-input.l).fill(null));

	//loop trough the string and use it to get random part of options array
	while (crypt.b.length >= fun.l(input.l)) {

		//reset
		fun.r();

		for (let i = 0; input.tl() > 1; i++){

			//slice random half based on crypt.t (binary string)
			input.t = fun.h(input.t,crypt.t[i]);

			//if this half has nothing
			if(input.t[0] === null){
				//slice first half of failing binary
				crypt.b = crypt.b.slice(input.l/2);
				//reset and reset for loop
				fun.r(); i = 0;
			}

			//only one element left after slice.
			if(input.t.length === 1){
				//set the result equal to that array element
				input.r = input.t[0];
				//slice part of binary string
				crypt.b = crypt.b.slice(i);
			}
		}

		//limit to the length specified 
		length--; if(length>=0) input.a.push(input.r);

	}

	return input.a;

};
