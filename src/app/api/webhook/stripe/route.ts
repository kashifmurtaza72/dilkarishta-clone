import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const buf = await req.arrayBuffer()
  const raw = Buffer.from(buf)
  const sig = req.headers.get('stripe-signature') || ''

  let event
  try {
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return new Response('invalid signature', { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed':
      // handle checkout completion (link to user or create subscription record)
      break
    case 'invoice.payment_succeeded':
      // update subscription status
      break
  }

  return new Response('ok')
}
