const timeOfDay = [
  [
    28800000,
    31500000
  ],
  [
    32100000,
    34800000
  ],
  [
    36000000,
    38700000
  ],
  [
    39300000,
    42000000
  ],
  [
    52200000,
    54900000
  ],
  [
    55500000,
    58200000
  ],
  [
    58800000,
    61500000
  ],
  [
    62100000,
    64800000
  ]
]

function getValidCourses (original, exclusive, week) {
  if(original == null) return []
  const processed = original.filter(course => {
    return course.validWeek.includes(week) && (course.exclusive == -1 || course.exclusive == exclusive)
  })
  
  return processed
}

function process (courses) {
  const courseList = []
  for (let index = 0; index < timeOfDay.length; index++) {
    const course = courses.find(c => c.index == index)
    if (course) {
      if (course.count != 1) {
        for (let count = 1; count <= course.count; count++) {
          const newCourse = Object.assign({}, course)
          newCourse.name = `${newCourse.name} (${count})`
          newCourse.index = newCourse.index - 1 + count
          courseList.push(newCourse)
        }
        index = index + course.count - 1
      } else {
        courseList.push(course)
      }
    } else {
      courseList.push(null)
    }
  }
  return courseList
}
function getSchoolWeekFromDate (date) {
  const start = new Date("2020/8/31") // 校历第一周第一天 
  const passedTime = date.getTime() - start.getTime()
  const passedDay = passedTime / (1000 * 3600 * 24)
  return parseInt(passedDay / 7) + 1
}
export default {
  getSchoolWeekFromDate,
  process,
  getValidCourses,
  timeOfDay
}