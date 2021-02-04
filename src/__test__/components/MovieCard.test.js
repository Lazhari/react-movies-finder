import { render, screen } from "@testing-library/react";
import MovieCard from "../../components/MovieCard";

test("renders MovieCard", () => {
  render(
    <MovieCard
      movie={{
        original_title: "Test",
        release_date: "2020",
        id: 3,
        poster_path: "test.png",
        vote_average: "5.6",
      }}
    />
  );
  const linkElement = screen.getByText(/test/i);
  expect(linkElement).toHaveTextContent("Test");
});
