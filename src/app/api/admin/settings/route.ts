import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/mysql';

export async function GET() {
  try {
    const { rows } = await executeQuery<{ setting_key: string; setting_value: string }>(
      'SELECT setting_key, setting_value FROM settings'
    );

    const settingsMap: Record<string, string> = {
      banner_image: '/images/factory_tin_shed.jpg',
      phone: '9557323216',
      email: 'contact@royalproindustrial.com',
      company_name: 'Royalpro Industrial Factory Tin Shed Work & Complete Interior Solution',
      address: 'Chipiyana, Tigri Gol Chakkar, Yusufpur, Nai Basti Dundahera, Ghaziabad, Uttar Pradesh 201009',
    };

    if (rows && rows.length > 0) {
      for (const r of rows) {
        settingsMap[r.setting_key] = r.setting_value;
      }
    }

    return NextResponse.json({
      success: true,
      data: settingsMap,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Error fetching settings';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    for (const [key, val] of Object.entries(body)) {
      if (typeof val === 'string') {
        await executeQuery(
          `INSERT INTO settings (setting_key, setting_value) VALUES (?, ?)
           ON DUPLICATE KEY UPDATE setting_value = ?`,
          [key, val, val]
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Settings successfully updated in royalpro_db database!',
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Error saving settings';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
