#!/bin/bash

# 🚀 Deployment Script for 3D Portfolio
# This script will prepare your portfolio for deployment

set -e  # Exit on error

echo "📦 Building your 3D portfolio for production..."
echo ""

# Navigate to project directory
cd "$(dirname "$0")"

echo "✓ Checking dependencies..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi

echo "✓ Installing/updating dependencies..."
npm install

echo "✓ Building production bundle..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Push your code to GitHub"
    echo "2. Go to vercel.com and sign up"
    echo "3. Import your GitHub repository"
    echo "4. Deploy (automatic)"
    echo "5. Add your GoDaddy domain in Vercel settings"
    echo "6. Update DNS records in GoDaddy:"
    echo "   - A Record: @ → 76.76.21.21"
    echo "   - CNAME: www → cname.vercel-dns.com"
    echo ""
    echo "📖 Full guide: See deployment_guide.md"
    echo ""
else
    echo "❌ Build failed. Check errors above."
    exit 1
fi
