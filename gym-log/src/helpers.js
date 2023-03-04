// Brzycki 1RM formula
// 1RM = w / [1.0278 - (0.0278 * r)]
// accurate for <= 10 reps
export const brzycki1RM = (w, r) => {
  return w / (1.0278 - 0.0278 * r)
}

// Epley 1RM formula
// 1RM = w * (1 + (0.0333 * r))
// Better than Brzycki for > 10 reps
export const epley1RM = (w, r) => {
  return w * (1 + 0.0333 * r)
}



