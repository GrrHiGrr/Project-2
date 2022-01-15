module.exports = {
    format_date: (date) => {
      // use MM/DD/YYYY format
      return `${new Date(date).getMonth() + 1} - ${new Date(date).getDate()}`
    },
};    