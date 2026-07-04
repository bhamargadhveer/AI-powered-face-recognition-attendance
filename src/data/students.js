const CLASSES = ["BSCS-6A","BSSE-4A","BSAI-5A","BSCYS-3A","BSIT-7A","BSCS-8A","BSSE-6B","BSAI-2A"];
const DEPTS = {
  "BSCS-6A": "Computer Science", "BSCS-8A": "Computer Science",
  "BSSE-4A": "Software Engineering", "BSSE-6B": "Software Engineering",
  "BSAI-5A": "AI & Data Science", "BSAI-2A": "AI & Data Science",
  "BSCYS-3A": "Cyber Security", "BSIT-7A": "Information Technology",
};
const NAMES = [
  "Ahmed Raza","Fatima Noor","Ali Hassan","Ayesha Siddiqui","Bilal Ahmed","Hira Shahid",
  "Usman Tariq","Zainab Malik","Hamza Iqbal","Sara Khan","Abdullah Sheikh","Mehwish Anwar",
  "Owais Farooq","Rimsha Aslam","Talha Nawaz","Iqra Javed","Saad Mahmood","Nimra Butt",
  "Kashif Rehman","Anum Zafar","Faizan Ali","Maryam Yousaf","Shahzaib Khalid","Bushra Riaz",
];

export const students = Array.from({ length: 48 }).map((_, i) => {
  const name = NAMES[i % NAMES.length] + (i >= NAMES.length ? ` ${Math.floor(i / NAMES.length) + 1}` : "");
  const className = CLASSES[i % CLASSES.length];
  const year = 2022 + (i % 4);
  return {
    id: `s_${1000 + i}`,
    name,
    rollNo: `${className.replace(/-.*/, "")}-F${String(year).slice(2)}-${String(100 + i).padStart(3, "0")}`,
    className,
    department: DEPTS[className],
    semester: Number(className.match(/-(\d)/)?.[1] || 1),
    email: `${name.toLowerCase().replace(/\s+/g, ".")}@university.edu.pk`,
    phone: `+92 3${String(100000000 + i * 1237).slice(0, 9)}`,
    attendance: 70 + ((i * 7) % 30),
    avatar: `https://i.pravatar.cc/80?img=${(i % 70) + 1}`,
    joined: `${year}-0${(i % 9) + 1}-1${i % 9}`,
    status: i % 13 === 0 ? "inactive" : "active",
  };
});