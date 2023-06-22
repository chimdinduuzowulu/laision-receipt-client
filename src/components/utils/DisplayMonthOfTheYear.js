export const DisplayMonthOfTheYear = (monthValue) => {
  switch (monthValue) {
    case '01':
      return 'Janaury';
    case '02':
      return 'Febuary';
    case '03':
      return 'March';
    case '04':
      return 'April';
    case '05':
      return 'May';
    case '06':
      return 'June';
    case '07':
      return 'July';
    case '08':
      return 'August';
    case '09':
      return 'September';
    case '10':
      return 'October';
    case '11':
      return 'November';
    case '12':
      return 'December';
    default:
      break;
  }
};
