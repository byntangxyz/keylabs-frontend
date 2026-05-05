import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

function FAQPage() {
  return (
    <div className="mt-16 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        Frequently Asked Questions
      </h1>

      <p className="text-lg text-center mb-8 max-w-2xl">
        Here are some of our FAQs. If you have any other quesitons you&apos;d
        like answered please feel free to email us.
      </p>

      <div className="w-full max-w-3xl">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What is your return policy?</AccordionTrigger>
            <AccordionContent>
              <p>
                Our return policy allows you to return items within 30 days of
                purchase for a full refund. Please ensure the items are in their
                original condition and packaging.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How long does shipping take?</AccordionTrigger>
            <AccordionContent>
              <p>
                Standard shipping takes 5-7 business days. Express shipping is
                available for an additional fee and typically arrives within 2-3
                business days.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Do you offer international shipping?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Yes, we offer international shipping to most countries. Shipping
                costs and delivery times may vary depending on the destination.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              What payment methods do you accept?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                We accept all major credit cards, PayPal, and bank transfers.
                Please note that some payment methods may have additional
                processing times.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Can I return my order?</AccordionTrigger>
            <AccordionContent>
              <p>
                Yes, you can return your order within 30 days of purchase.
                Please ensure that the items are in their original condition and
                packaging. To initiate a return, please contact our customer
                support team with your order details.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default FAQPage;
