// Your code here
function createEmployeeRecord(employeeInfo) {
    return {
      firstName: employeeInfo[0],
      familyName: employeeInfo[1],
      title: employeeInfo[2],
      payPerHour: employeeInfo[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  function createEmployeeRecords(employeesInfo) {
    return employeesInfo.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employeeRecord, timeStamp) {
    const [date, hour] = timeStamp.split(' ');
    employeeRecord.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour, 10),
      date,
    });
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, timeStamp) {
    const [date, hour] = timeStamp.split(' ');
    employeeRecord.timeOutEvents.push({
      type: 'TimeOut',
      hour: parseInt(hour, 10),
      date,
    });
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find((event) => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find((event) => event.date === date);
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const wagesEarned = hoursWorked * employeeRecord.payPerHour;
    return wagesEarned;
  }
  
  function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map((event) => event.date);
    const totalWages = dates.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
    return totalWages;
  }
  
  function calculatePayroll(employees) {
    const totalPayroll = employees.reduce((total, employee) => total + allWagesFor(employee), 0);
    return totalPayroll;
  }
  
  // Test createEmployeeRecord function
  const employeeInfo = ["John", "Doe", "Manager", 20];
  const employeeRecord = createEmployeeRecord(employeeInfo);
  console.log(employeeRecord);
  
  // Test createEmployeeRecords function
  const employeesInfo = [
    ["John", "Doe", "Manager", 20],
    ["Jane", "Smith", "Assistant", 15],
  ];
  const employeesRecords = createEmployeeRecords(employeesInfo);
  console.log(employeesRecords);
  
  // Test createTimeInEvent function
  const timeInStamp = "2023-09-25 0800";
  const employeeWithTimeIn = createTimeInEvent(employeeRecord, timeInStamp);
  console.log(employeeWithTimeIn);
  
  // Test createTimeOutEvent function
  const timeOutStamp = "2023-09-25 1700";
  const employeeWithTimeOut = createTimeOutEvent(employeeRecord, timeOutStamp);
  console.log(employeeWithTimeOut);
  
  // Test hoursWorkedOnDate function
  const date = "2023-09-25";
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  console.log(`Hours worked on ${date}: ${hoursWorked}`);
  
  // Test wagesEarnedOnDate function
  const wagesEarned = wagesEarnedOnDate(employeeRecord, date);
  console.log(`Wages earned on ${date}: $${wagesEarned}`);
  
  // Test allWagesFor function
  const totalWages = allWagesFor(employeeRecord);
  console.log(`Total wages earned: $${totalWages}`);
  
  // Test calculatePayroll function
  const employees = [employeeRecord, ...employeesRecords];
  const totalPayroll = calculatePayroll(employees);
  console.log(`Total payroll for all employees: $${totalPayroll}`);
  