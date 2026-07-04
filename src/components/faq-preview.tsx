"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQS } from "@/lib/products"

// Show the five highest-intent questions on the home page; the full set lives
// on /faq.
const HOME_FAQS = FAQS.slice(0, 5)

export function FaqPreview() {
  return (
    <section id="faq" className="relative bg-background py-14 md:py-24">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            FAQ
          </span>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold leading-[1] tracking-tight text-foreground md:mt-4 md:text-5xl">
            Everything you need to know.
          </h2>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground md:mt-5 md:text-base">
            Straight answers on access, payment and reselling — so you can buy
            with confidence.
          </p>
        </motion.div>

        <Accordion
          type="single"
          collapsible
          defaultValue="item-0"
          className="mt-8 flex flex-col gap-3 md:mt-12"
        >
          {HOME_FAQS.map((faq, i) => (
            <AccordionItem
              key={faq.q}
              value={`item-${i}`}
              data-testid={`home-faq-${i}`}
              className="overflow-hidden rounded-2xl border border-border bg-card/50 transition-colors last:border-b hover:border-accent/40 data-[state=open]:border-accent/40"
            >
              <AccordionTrigger className="px-6 py-5 text-left hover:no-underline [&>svg]:size-5 [&>svg]:text-accent">
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

        <div className="mt-10 flex justify-center">
          <Link
            href="/faq"
            data-testid="faq-view-all"
            className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:text-accent"
          >
            View all FAQs
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
