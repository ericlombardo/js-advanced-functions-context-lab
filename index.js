let createEmployeeRecord = (employeeInfo) => {
  return {
    firstName: employeeInfo[0],  
    familyName: employeeInfo[1],
    title: employeeInfo[2],
    payPerHour: employeeInfo[3],
    timeInEvents: [],
    timeOutEvents: []
  } 
}

let createEmployeeRecords = (employeesInfo) => {
    return employeesInfo.map(employee => {
        return createEmployeeRecord(employee)
    })
}

let createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour),
        date: date
    })
    return this
}

let createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour),
        date: date
    })
    return this
}

let hoursWorkedOnDate = function(date){
    const timeIn = this.timeInEvents.find(time => time.date === date).hour
    const timeOut = this.timeOutEvents.find(time => time.date === date).hour
    return (timeOut - timeIn) / 100
}

let wagesEarnedOnDate = function(date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

let calculatePayroll = function(employees){
    return employees.reduce(function(total, employee){
        return total + allWagesFor.call(employee)
    }, 0)
}

let findEmployeeByFirstName = function(employeeList, employeeName){
    return employeeList.find(employee => employee.firstName === employeeName)
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}