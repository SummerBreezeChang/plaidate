import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion";

export default function Faq() {
	return (
		<div className="flex flex-col items-center justify-center gap-6 py-10">
			<div className="flex flex-col items-center justify-center gap-2 max-w-md">
				<h2 className="sm:text-3xl text-2xl font-semibold text-foreground">
					Frequently Asked Questions
				</h2>
				<p className="sm:text-base text-sm text-muted-foreground text-center">
					Everything you need to know about the template. Find answers to common
					questions.
				</p>
			</div>
			<div className="w-full max-w-lg">
				<Accordion
					type="single"
					collapsible
					className="w-full flex flex-col gap-4"
				>
					<AccordionItem value="item-1">
						<AccordionTrigger className="hover:no-underline">
							What's included in this template?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							This template is a comprehensive Next.js 15 starter kit designed
							to help you build your next project quickly and efficiently. It
							includes a range of features and components that you can use to
							get started, including a responsive design, a dark mode toggle,
							and a form component.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger className="hover:no-underline">
							How do I get started with this template?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							To get started with this template, you can clone the repository
							and install the dependencies using npm or yarn. Once you have the
							dependencies installed, you can start the development server using
							npm run dev or yarn dev.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger className="hover:no-underline">
							How do I customize the template to my needs?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							You can customize the template to your needs by modifying the
							components and pages in the src directory. You can also add your
							own components and pages to the src directory.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
}
