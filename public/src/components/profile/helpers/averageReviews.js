export default function averageReviews(reviews) {
  let ratings = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  }

  if (reviews.length > 0) {
    for (var i = 0; i < reviews.length; i++) {
      ratings[reviews[i].rating] += 1
    }
  } else {
    return (0)
  }

var scores = ratings[1] * 1 + ratings[2] * 2 + ratings[3] * 3 + ratings[4] * 4 + ratings[5] * 5
return scores / reviews.length
}