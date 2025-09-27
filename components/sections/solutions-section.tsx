import { Card } from "@/components/ui/card"

const SolutionsSection = ({ product }) => {
  const finalUrl = product.homepage_image || "/placeholder.svg?height=300&width=400"

  console.log("[v0] Product image URL:", { productId: product.id, imageName: product.homepage_image, finalUrl })

  return (
    <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={finalUrl || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {/* ... existing code here ... */}
    </Card>
  )
}

export default SolutionsSection
