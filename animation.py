from manim import *

class GenerateSquare(Scene):
    def construct(self):
        square = Square()
        self.play(ShowCreation(square))
        self.wait()
