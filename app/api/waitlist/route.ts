import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Insert email into waitlist table (created_at will be set by DEFAULT NOW())
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email }])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      
      // Check if it's a duplicate email error
      if (error.code === '23505' || error.message.includes('duplicate')) {
        return NextResponse.json(
          { error: 'This email is already on the waitlist' },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to add email to waitlist' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Successfully added to waitlist', data },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

