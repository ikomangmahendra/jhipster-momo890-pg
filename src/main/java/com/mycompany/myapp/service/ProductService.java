package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Product;
import com.mycompany.myapp.repository.ProductRepository;
import com.mycompany.myapp.service.dto.ProductDTO;
import com.mycompany.myapp.service.mapper.ProductMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Product}.
 */
@Service
@Transactional
public class ProductService {

    private static final Logger LOG = LoggerFactory.getLogger(ProductService.class);

    private final ProductRepository productRepository;

    private final ProductMapper productMapper;

    public ProductService(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    /**
     * Save a product.
     *
     * @param productDTO the entity to save.
     * @return the persisted entity.
     */
    public ProductDTO save(ProductDTO productDTO) {
        LOG.debug("Request to save Product : {}", productDTO);
        Product product = productMapper.toEntity(productDTO);
        product = productRepository.save(product);
        return productMapper.toDto(product);
    }

    /**
     * Update a product.
     *
     * @param productDTO the entity to save.
     * @return the persisted entity.
     */
    public ProductDTO update(ProductDTO productDTO) {
        LOG.debug("Request to update Product : {}", productDTO);
        Product product = productMapper.toEntity(productDTO);
        product = productRepository.save(product);
        return productMapper.toDto(product);
    }

    /**
     * Partially update a product.
     *
     * @param productDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ProductDTO> partialUpdate(ProductDTO productDTO) {
        LOG.debug("Request to partially update Product : {}", productDTO);

        return productRepository
            .findById(productDTO.getId())
            .map(existingProduct -> {
                productMapper.partialUpdate(existingProduct, productDTO);

                return existingProduct;
            })
            .map(productRepository::save)
            .map(productMapper::toDto);
    }

    /**
     * Get all the products.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ProductDTO> findAll() {
        LOG.debug("Request to get all Products");
        return productRepository.findAll().stream().map(productMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> findAllProductsByCategoriesId(Long categoriesId) {
        LOG.debug("Request to get all Products by categories : {}", categoriesId);
        return productRepository
            .findAllProductsByCategoriesId(categoriesId)
            .stream()
            .map(productMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the products with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<ProductDTO> findAllWithEagerRelationships(Pageable pageable) {
        return productRepository.findAllWithEagerRelationships(pageable).map(productMapper::toDto);
    }

    /**
     * Get one product by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ProductDTO> findOne(Long id) {
        LOG.debug("Request to get Product : {}", id);
        return productRepository.findOneWithEagerRelationships(id).map(productMapper::toDto);
    }

    /**
     * Delete the product by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete Product : {}", id);
        productRepository.deleteById(id);
    }
}
