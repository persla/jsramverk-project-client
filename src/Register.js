// import React, { Component } from 'react';

import React from 'react';
import { Link, Redirect } from "react-router-dom";
import auth from "./models/auth.js";


class Loginreg extends React.Component {
    render() {
        return (
            <Register />
        );
    }
}

const validEmailRegex = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
// const validDateRegex = RegExp(/(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])/g);
// const validPasswordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
// const validYearRegex = RegExp(/(19|20)\d\d/g);
// const validMonthRegex = RegExp(/(01|02|03|04|05|06|07|08|09|10|11|12)/i);
// const validDayRegex = RegExp(/([1-9]|[12][0-9]|3[01])/g);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
        );
    return valid;
}

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // fullName: null,
            email: null,
            password: null,
            // yearChoice: null,
            // monthChoice: null,
            // dayChoice: null,
            showPassword: null,
            formValidation: null,
            inLogged: null,
            isGoing: false,
            isOk: false,
            errors: {
                // fullName: '',
                email: '',
                password: '',
                // yearChoice: '',
                // monthChoice: '',
                // dayChoice: '',

            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
      }

handleChange = (event) => {
  event.preventDefault();
  const { name, value } = event.target;
  let errors = this.state.errors;

  switch (name) {
    // case 'fullName':
    //   errors.fullName =
    //     value.length < 5
    //       ? 'Minst 5 tecken.'
    //       : '';
    //   break;
    case 'email':
      errors.email =
        validEmailRegex.test(value)
          ? ''
          : 'E-post inte giltig än!';
      break;
        // case 'yearChoice':
        //   errors.yearChoice =
        //     validYearRegex.test(value)
        //       ? ''
        //       : 'Välj år.';
        //   break;
        //   case 'monthChoice':
        //     errors.monthChoice =
        //       validMonthRegex.test(value)
        //         ? ''
        //         : 'Välj månad.';
        //     break
        //     case 'dayChoice':
        //       errors.dayChoice =
        //         validDayRegex.test(value)
        //           ? ''
        //           : 'Välj dag.';
        //       break;
    case 'password':
      errors.password =
      value.length < 5
        ? 'Minst 5 tecken.'
        : '';
      break;
    default:
      break;
  }

  this.setState({errors, [name]: value});
}

handleSubmit = (event) => {
  event.preventDefault();
  if(validateForm(this.state.errors) && this.state.fullName !== null) {
      this.setState({formValidation: 'Giltigt registreringsformulär!'});
      this.setState({inLogged: "inloggad"});
      auth.registrer(
        auth.htmlEntities(this.state.fullName),
          auth.htmlEntities(this.state.email),
          auth.htmlEntities(this.state.yearChoice),
          auth.htmlEntities(this.state.monthChoice),
          auth.htmlEntities(this.state.dayChoice),
          auth.htmlEntities(this.state.password),
          );
  }else{
     this.setState({formValidation: 'Ogiltigt registreringsformulär!'});
  }

}

render() {
  if (this.state.inLogged) {
    return <Redirect to="/Login" />;
  }
  // console.log(this.state.inLogged);
  const {errors} = this.state;
  console.log(errors);
  
//   const months = [
//     {idMonth: '01', month: 'Jan', monthDays: 31},
//     {idMonth: '02', month: 'Feb', monthDays: 28},
//     {idMonth: '03', month: 'Mar', monthDays: 31},
//     {idMonth: '04', month: 'Apr', monthDays: 30},
//     {idMonth: '05', month: 'Maj', monthDays: 31},
//     {idMonth: '06', month: 'Jun', monthDays: 30},
//     {idMonth: '07', month: 'Jul', monthDays: 31},
//     {idMonth: '08', month: 'Aug', monthDays: 31},
//     {idMonth: '09', month: 'Sep', monthDays: 30},
//     {idMonth: '10', month: 'Okt', monthDays: 31},
//     {idMonth: '11', month: 'Nov', monthDays: 30},
//     {idMonth: '12', month: 'Dec', monthDays: 31}
//   ];

//   const listMonts = months.map((month) =>
//   <option value={month.idMonth} key={month.month}>{month.month}</option>
// );

// const range = (start, end, step) => {
//   return Array.from(Array.from(Array(Math.ceil((end-start)/step)).keys()), x => start+ x*step);
// }

// const days = range(1, 32, 1);
// const listDays = days.map((day) =>
// <option value={('0000'+day.toString()).slice(-2)} key={day}>{day}</option>

// );

// const years = range(1900, 2100, 1);
// const listYears = years.map((year, index) =>
// <option value={year}key={year}></option>
// );


  return (

    <div className='wrapper'>
      <div className='form-wrapper'>
        <h2>Registrering</h2>
        <span className='intro'>Som registrerad användare får du handla på stockarmarknaden.
        </span><br/>
        <form onSubmit={this.handleSubmit} noValidate>

          {/* <div className='fullName'>
            <label htmlFor="fullName">Användarnamn {errors.fullName.length > 0 &&
              <span className='error'>{errors.fullName}</span>}
            {this.state.fullName !== null && this.state.fullName.length > 4 ?
                <span className='valid'>&#10004;</span> :
            ''}</label>
            <span className='info'>Minst fem tecken</span>
            <input type='text' name='fullName'  required onChange={this.handleChange} noValidate />
          </div> */}

          <div className='email'>
            <label htmlFor="email">E-post {errors.email.length > 0 &&
              <span className='error'>{errors.email}</span>}
              {this.state.email !== null && errors.email.length === 0 ?
                  <span className='valid'>&#10004;</span> :
              ''}</label>
            <input type='email' name='email'  required onChange={this.handleChange} noValidate />

              </div>

          <div className='password'>
            <label htmlFor="password">Lösenord
            <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
            <span className='info'>Visa/Dölj! </span>{errors.password.length > 0 &&
              <span className='error'>{errors.password}</span>}
              {this.state.password !== null && errors.password.length === 0 ?
                  <span className='valid'>&#10004;</span> :
              ''} </label><span className='info'>Minst fem tecken</span>
            {this.state.isGoing === false ?
                <input type='password' name='password'  required onChange={this.handleChange} noValidate />
                :
                <input type='text' name='password'  required onChange={this.handleChange} />
            }

              </div>

              {/* <div className='birth'>
              <label htmlFor="year">Födelsedatum
                 {this.state.yearChoice !== null && errors.yearChoice.length === 0 &&
                     this.state.monthChoice !== null && errors.monthChoice.length === 0 &&
                     this.state.dayChoice !== null && errors.dayChoice.length === 0
                     ?
                     <span className='valid'> &#10004;</span> :
                 ''}</label>
              </div> */}

              {/* <div className='datum'>
              <input list="year" placeholder="åååå" id="yearChoice" maxLength="4" name="yearChoice"
              inputMode="numeric" pattern="[0-9]{4}" required onChange={this.handleChange} noValidate/>
              <datalist id="year">
              {listYears}
              </datalist>
              {errors.yearChoice.length > 0 &&
                <span className='error'>{errors.yearChoice}</span>}

              </div> */}

              {/* <div className='datum'>
              <input list="month" placeholder="mm" id="monthChoice" maxLength="2" name="monthChoice"
              inputMode="numeric" pattern="[0-9]{2}" required onChange={this.handleChange} noValidate />
              <datalist id="month">
              {listMonts}
              </datalist>
              {errors.monthChoice.length > 0 &&
                <span className='error'>{errors.monthChoice}</span>}

              </div> */}

              {/* <div className='datum'>
              <input type="text"  list="day"  placeholder="dd" id="dayChoice" maxLength="2" name="dayChoice"
              inputMode="numeric" pattern="[0-9]{2}" required onChange={this.handleChange} noValidate />
              <datalist id="day">
              {listDays}
              </datalist>

              {errors.dayChoice.length > 0 &&
                <span className='error'>{errors.dayChoice}</span>}

                </div> */}

              <div className='submit'>
                <span className='info'>Jag godkänner hur applikationen skyddar mina uppgifter</span>
                <input
                name="isOk"
                type="checkbox"
                checked={this.state.isOk}
                onChange={this.handleInputChange} />
                <span className='info'>{this.state.formValidation}</span>

                {this.state.isOk === true ?
                    <div className='submit'>
                       <button onClick={this.handleSubmit}>Registrera</button>
                     </div> :
                     <div className='submit'>
                        <button disabled>Registrera</button>
                      </div>
                }
                <Link to="/Login" style={{color: 'blue', margin: 'auto'}}>Inloggning</Link>
                  </div>


        </form>
      </div>
    </div>
  );
}
}
export default Loginreg
