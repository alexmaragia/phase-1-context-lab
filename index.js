/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    });

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0); // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable;
}

// Function to create a single employee record
function createEmployeeRecord(arr) {
    const record = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    console.log("Created employee record:", record);
    return record;
}

// Function to create multiple employee records
function createEmployeeRecords(arrays) {
    const records = arrays.map(createEmployeeRecord);
    console.log("Created multiple employee records:", records);
    return records;
}

// Method to create a TimeIn event
function createTimeInEvent(timestamp) {
    let [date, hour] = timestamp.split(" ");
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    console.log(`Added TimeIn event for ${this.firstName} ${this.familyName}:`, this.timeInEvents);
    return this;
}

// Method to create a TimeOut event
function createTimeOutEvent(timestamp) {
    let [date, hour] = timestamp.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    console.log(`Added TimeOut event for ${this.firstName} ${this.familyName}:`, this.timeOutEvents);
    return this;
}

// Method to calculate hours worked on a specific date
function hoursWorkedOnDate(date) {
    let timeInEvent = this.timeInEvents.find(e => e.date === date);
    let timeOutEvent = this.timeOutEvents.find(e => e.date === date);
    let hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    console.log(`Hours worked on ${date} by ${this.firstName} ${this.familyName}:`, hoursWorked);
    return hoursWorked;
}

// Method to calculate wages earned on a specific date
function wagesEarnedOnDate(date) {
    let wages = hoursWorkedOnDate.call(this, date) * this.payPerHour;
    console.log(`Wages earned on ${date} by ${this.firstName} ${this.familyName}:`, wages);
    return wages;
}

// Function to find an employee by first name
function findEmployeeByFirstName(srcArray, firstName) {
    let employee = srcArray.find(emp => emp.firstName === firstName);
    console.log(`Found employee by first name ${firstName}:`, employee);
    return employee;
}

// Function to calculate total payroll for all employees
function calculatePayroll(empRecords) {
    let totalPayroll = empRecords.reduce((memo, emp) => memo + allWagesFor.call(emp), 0);
    console.log("Total payroll for all employees:", totalPayroll);
    return totalPayroll;
}

// Exporting functions for testing
module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    findEmployeeByFirstName,
    calculatePayroll
};
