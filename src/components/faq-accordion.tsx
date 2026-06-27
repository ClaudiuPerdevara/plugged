"use client"

import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQS } from "@/lib/products"

export function FaqAccordion() {
  return (
    <section className="mx-auto max-w-3xl px-5 pb-28 pt-28 md:px-8 md:pt-36">
      <div className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Help Center
        </span>
        <h1 className="mt-4 text-balance font-heading text-4xl font-bold leading-[1] tracking-tight text-foreground md:text-5xl">
          Frequently asked questions
        </h1>
        <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
          Everything you need to know about bundles, access and reselling. Still
          stuck?{" "}
          <Link href="/support" className="text-foreground hover:text-accent">
            Reach out to support
          </Link>
          .
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue="item-0"
        className="mt-12 flex flex-col gap-3"
      >
        {FAQS.map((faq, i) => (
          <AccordionItem
            key={faq.q}
            value={`item-${i}`}
            className="overflow-hidden rounded-2xl border border-border bg-card/50 transition-colors hover:border-accent/40 data-[state=open]:border-accent/40"
          >
            <AccordionTrigger className="px-6 py-5 hover:no-underline [&>svg]:size-5 [&>svg]:text-accent">
              <span className="font-heading text-base font-bold text-foreground">
                {faq.q}
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
