from manim import *

class SquareToTriangle(Scene):
    def construct(self):
        square = Square(color=YELLOW, fill_opacity=1)
        self.play(Create(square))
        self.wait(3)

        triangle = Polygon(
            ORIGIN, 
            RIGHT, 
            UP,
            color=YELLOW,
            fill_opacity=1
        )
        self.play(Transform(square, triangle))
        self.wait()
