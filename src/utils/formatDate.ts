const formatDate = (date:string) => {
  const d = new Date(date);
  return d.toLocaleDateString();
}

export default formatDate;