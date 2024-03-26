import { video_render } from '../../services/utilities'

export async function GET() {
	const conv = await video_render(`
from manim import *

class Anima(Scene):
    def construct(self):
        # Create two circles next to each other with the same radius
        circle1 = Circle(radius=1, color=BLUE).shift(LEFT)
        circle2 = Circle(radius=1, color=GREEN).shift(RIGHT)

        # Create an ellipse at the conjunction point of the two circles in a vertical position
        ellipse = Ellipse(width=0.2, height=2, color=RED).move_to(circle1.get_right())

        # Add the circles and ellipse to the scene
        self.play(Create(circle1), Create(circle2))
        self.play(Create(ellipse))
        self.wait()`)

	return new Response(JSON.stringify(conv) as any, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
}
