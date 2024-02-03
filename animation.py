
from manim import *

class Anima(Scene):
    def construct(self):
        axes = Axes(
            x_range=[-3, 3],
            y_range=[-1, 9],
            axis_config={"color": BLUE},
        )

        square_function = axes.plot(lambda x: x**2, color=YELLOW)
        square_label = axes.get_graph_label(square_function, label='x^{2}', color=YELLOW)

        self.play(Create(axes), Create(square_function), Write(square_label))
        self.wait()
