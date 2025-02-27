package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Category;
import com.mycompany.myapp.service.dto.CategoryDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

/**
 * Mapper for the entity {@link Category} and its DTO {@link CategoryDTO}.
 */
@Mapper(componentModel = "spring")
public interface CategoryMapper extends EntityMapper<CategoryDTO, Category> {
    @Mapping(target = "parentId", source = "parent", qualifiedByName = "toParentId")
    CategoryDTO toDto(Category s);

    @Mapping(target = "parent", source = "parentId", qualifiedByName = "toParentEntity")
    Category toEntity(CategoryDTO categoryDTO);

    @Named("toParentId")
    default Long toParentId(Category parent) {
        return parent == null ? null : parent.getId();
    }

    @Named("toParentEntity")
    default Category toParentEntity(Long parentId) {
        if (parentId == null) {
            return null;
        } else {
            Category parent = new Category();
            parent.setId(parentId);
            return parent;
        }
    }
}
